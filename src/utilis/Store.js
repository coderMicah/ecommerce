"use client";
import { createContext, useReducer } from "react";
import Cookies from "js-cookie";

const initialState = {
  //   darkMode: false,
  cart: {
    cartItems: Cookies.get("cartItems")
      ? JSON.parse(Cookies.get("cartItems"))
      : [],
    shippingAddress: Cookies.get("shippingAddress")
      ? JSON.parse(Cookies.get("shippingAddress"))
      : {},
    paymentMethod: Cookies.get("paymentMethod")
      ? Cookies.get("paymentMethod")
      : "",
  },

  userInfo: Cookies.get("userInfo")
    ? JSON.parse(Cookies.get("userInfo"))
    : null,
};

function reducer(state, action) {
  switch (action.type) {
    // case DARK_MODE_ON:
    //   return { ...state, darkMode: true };
    // case DARK_MODE_OFF:
    //   return { ...state, darkMode: false };
    case "CART_ADD_ITEM":
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      );
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === newItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      Cookies.set("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case "CART_REMOVE_ITEM":
      const Items = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      Cookies.set("cartItems", JSON.stringify(Items));
      return { ...state, cart: { ...state.cart, Items } };

    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };

    case "USER_LOGIN":
      return { ...state, userInfo: action.payload };
    case "USER_LOGOUT":
      return { ...state, userInfo: null, cartItems: [], shippingAddress: {} };
    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };

    // case "CART_UPDATE_ITEM":
    //   const item = action.payload;
    //   const existingItem = state.cartItems.find((x) => x._id === item._id);
    //   if (existingItem) {
    //     return {
    //       ...state,
    //       cartItems: state.cartItems.map((x) =>
    //         x._id === existingItem._id ? item : x
    //       ),
    //     };
    //   } else {
    //     return { ...state };
    //   }
    default:
      return state;
  }
}

export const Store = createContext();

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>
      {props.children}
    </Store.Provider>
  );
}
