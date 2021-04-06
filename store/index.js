import axios from "axios";

export const state = () => ({
  cartUIStatus: "empty",
  cart: [],
  clientSecret: "" // Required to initiate the payment from the client
});

export const getters = {
  cartCount: state => {
    if (!state.cart.length) return 0;
    return state.cart.reduce((ac, next) => ac + next.quantity, 0);
  },
  cartTotal: state => {
    if (!state.cart.length) return 0;
    return state.cart.reduce((ac, next) => ac + next.quantity * next.price, 0);
  },
  cartItems: state => {
    if (!state.cart.length) return [];
    return state.cart.map(item => {
      return {
        id: item.id,
        price: item.price,
        quantity: item.quantity
      };
    });
  },
  clientSecret: state => state.clientSecret
};

export const mutations = {
  resetCart: state => {
    (state.cart = []), (state.cartUIStatus = "empty");
  },
  addToCart: (state, payload) => {
    if (state.cart.length === 0) state.cartUIStatus = "idle"
    let itemfound = state.cart.find(el => el.id === payload.id);
    itemfound
      ? (itemfound.quantity++)
      : state.cart.push(payload)
  },
  removeOneFromCart: (state, payload) => {
    let index = state.cart.findIndex(el => el.id === payload.id)
    if (state.cart[index].quantity > 1) {
      state.cart[index].quantity--
    }
  },
  removeAllFromCart: (state, payload) => {
    state.cart = state.cart.filter(el => el.id !== payload.id)
    if (state.cart.length === 0) {
      state.cartUIStatus = "empty"
    }
  },
  startCheckout: state => {
    if (state.cartUIStatus === "idle") {
      state.cartUIStatus = "checkout"
    }
  },
  orderCompleted: state => {
    if (state.cartUIStatus === "checkout") {
      state.cartUIStatus = "completed"
      state.cart = []
    }
  },
  setClientSecret: (state, payload) => {
    state.clientSecret = payload;
  },
};

export const actions = {
  async createPaymentIntent({ getters, commit }) {
    try {
      // Create a PaymentIntent with the information about the order
      const result = await axios.post(
        "/.netlify/functions/create-payment-intent",
        {
          items: getters.cartItems
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      if (result.data.clientSecret) {
        // Store a reference to the client secret created by the PaymentIntent
        // This secret will be used to finalize the payment from the client
        commit("setClientSecret", result.data.clientSecret);
      }
    } catch (e) {
      console.log("error", e);
    }
  }
};
