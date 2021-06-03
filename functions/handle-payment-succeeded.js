// Webhook that listens for events sent from Stripe
// Requires configuration in the Stripe Dashboard
// For more information read https://stripe.com/docs/webhooks
require("dotenv").config();

const {
  STRIPE_SECRET_KEY,
  STRIPE_WEBHOOK_SECRET,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  TWILIO_NUMBER,
  SENDGRID_API_KEY,
  SENDGRID_EMAIL,
} = process.env;

const stripe = require("stripe")(STRIPE_SECRET_KEY);
const twilio = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(SENDGRID_API_KEY);

async function sendEmail(customerEmail, orderDetails) {
  try {
    await sendgrid.send({
      from: SENDGRID_EMAIL,
      templateId: "d-359a4929e63d43e3aad92a53231cb5e9",
      to: customerEmail,
      dynamicTemplateData: orderDetails,
    });
    console.log("email sent");
  } catch (error) {
    console.error(error);
  }
}

async function sendSMS(customerPhone, total) {
  try {
    const response = await twilio.messages.create({
      from: TWILIO_NUMBER,
      to: customerPhone,
      body: `🛒 Your Gyminal order for $${total} has been created!`,
    });
    console.log("SMS sent", response);
  } catch (error) {
    console.error("error sending SMS:", error);
  }
}

// Create your webhook in the Stripe dashboard at https://dashboard.stripe.com/webhooks
// Use the secret listed in the "Signing secret" section
exports.handler = async (event, context) => {
  const sig = event.headers["stripe-signature"];
  let stripeEvent;

  try {
    // Verifies that the event was sent by Stripe and deserializes the event
    stripeEvent = stripe.webhooks.constructEvent(
      event.body,
      sig,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    return { statusCode: 400, body: "could not deserialize event" };
  }

  // Handle the event
  switch (stripeEvent.type) {
    case "payment_intent.succeeded":
      const paymentIntent = stripeEvent.data.object;
      console.log("object", paymentIntent);
      const customerEmail = paymentIntent.receipt_email;
      const orderDetails = JSON.parse(paymentIntent.metadata.order);
      const tasks = [];
      if (customerEmail && orderDetails && orderDetails.total) {
        tasks.push(sendEmail(customerEmail, orderDetails));
      }
      const customerPhone = paymentIntent.shipping.phone;
      if (customerPhone && orderDetails && orderDetails.total) {
        tasks.push(sendSMS(customerPhone, orderDetails.total));
      }
      await Promise.all(tasks);
      break;
    case "charge.dispute.created":
      const charge = stripeEvent.data.object;
      console.log("Someone disputed a payment!");
      break;
    // ... handle other event types
    default:
      // Unexpected event type
      return { statusCode: 400, body: "unknown event type" };
  }

  // Return a 200 response to acknowledge receipt of the event
  return { statusCode: 200 };
};
