// An endpoint that calculates the order total and creates a 
// PaymentIntent on Stripe 
require("dotenv").config();
const fs = require("fs");
// read in the product details from a file
// this file is updated using content from Netlify CMS during the nuxt build process
const json = fs.readFileSync(require.resolve('./data.json'))
const database = JSON.parse(json)

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY),
  headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type"
  };

exports.handler = async (event, context) => {
  console.log(database)
  // CORS
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers
    };
  }

  const body = JSON.parse(event.body);

  if (!body.items) {
    console.error("List of items to purchase is missing.");

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: "missing information"
      })
    };
  }

  // Stripe payment processing begins here
  try {
    const amount = body.items.reduce((prev, item) => {
      //lookup item information from "database" and calculate total amount
      const itemData = database.find(
        storeItem => storeItem.id === item.id
      );
      return prev + item.price * 100 * item.quantity;
    }, 0);

    // Create a PaymentIntent on Stripe
    // A PaymentIntent represents your customer's intent to pay
    // and needs to be confirmed on the client to finalize the payment
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "usd",
      amount: amount,
      description: "Order from store",
      metadata: {
        phone: "+13037317422"
      }
    });

    // Send the client_secret to the client
    // The client secret has a limited set of permissions that
    // let you finalize the payment and update some details from the client
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({
        clientSecret: paymentIntent.client_secret
      })
    };
  } catch (err) {
    console.log(err);

    return {
      statusCode: 400,
      headers,
      body: JSON.stringify({
        status: err
      })
    };
  }
};
