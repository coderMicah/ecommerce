"use client";
import { Store } from "@/utilis/Store";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function Payment() {
  const { register, handleSubmit, setValue } = useForm();
  const router = useRouter();
  const { state, dispatch } = useContext(Store);

  const {
    cart: { shippingAddress, paymentMethod },
  } = state;

  useEffect(() => {
    if (!shippingAddress) {
      router.push("/shipping");
    }
    setValue("paymentMethod", paymentMethod);
  }, []);

  const onSubmit = ({ paymentMethod }) => {
    if (!paymentMethod) {
      alert("Payment is required");
      return;
    } else {
      Cookies.set("paymentMethod", paymentMethod);
      dispatch({ type: "SAVE_PAYMENT_METHOD", payload: paymentMethod });
      router.push("/placeorder");
    }
  };

  return (
    <div>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
              <h2 className="mt-10  text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Payment Method
              </h2>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="mpesa"
                type="radio"
                value="mpesa"
                name="paymentMethod"
                {...register("paymentMethod")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="mpesa"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Mpesa
              </label>
            </div>

            <div className="flex items-center mb-4">
              <input
                id="paypal"
                type="radio"
                value="paypal"
                {...register("paymentMethod")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="paypal"
                className="ml-2 text-sm font-medium text-gray-900"
              >
                Paypal
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="other"
                type="radio"
                value="other"
                {...register("paymentMethod")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
              />
              <label
                htmlFor="other"
                className="ml-2 text-sm font-medium text-gray-900 "
              >
                Other
              </label>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;
