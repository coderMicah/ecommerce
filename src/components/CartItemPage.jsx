"use client";

import { Store } from "@/utilis/Store";
import Link from "next/link";
import { useContext } from "react";
import CartItem from "./CartItem";

function CartItemPage() {
  const { state } = useContext(Store);
  const { cartItems } = state.cart;
  
  const checkoutHandler = () => {};
  return (
    <div className="bg-white pt-20">
      <h1 className=" px-6 text-gray-700 text-3xl font-bold">Cart Items</h1>

      {
        cartItems.length === 0 ? (
          <div className="mx-auto px-6 py-16 lg:px-8">
            <p className="text-bold text-3xl text-black">Cart is Empty</p>
            <Link href="/">Go Shopping</Link>
          </div>
        ) : (
          <div className="mx-auto px-6 py-16 lg:px-8 max-w-4xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr]  lg:gap-12  ">
            <div className="rounded-lg lg:col-span-2">
              {cartItems.map((item) => (
                <CartItem key={item._id} item={item} />
              ))}
            </div>

            <div className="h-full rounded-lg border bg-white p-6 shadow-md lg:col-span-1  ">
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">
                  Subtotal({cartItems.reduce((a, c) => a + c.quantity, 0)}{" "}
                  items)
                </p>
                <p className="text-gray-700">
                  ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </p>
              </div>
              <hr className="my-4" />

              <button
                onClick={checkoutHandler}
                className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              >
                Check out
              </button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default CartItemPage;
