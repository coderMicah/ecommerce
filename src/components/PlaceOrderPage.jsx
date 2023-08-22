"use client";

import { Store } from "@/utilis/Store";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { urlForImage } from "../../sanity/lib/image";

import { CreditCardIcon, UserCircleIcon } from "@heroicons/react/24/outline";
import { MapPinIcon } from "@heroicons/react/20/solid";
import axios from "axios";
import Cookies from "js-cookie";

function PlaceOrderPage() {
  const router = useRouter();
  const { state, dispatch } = useContext(Store);
  const {userInfo} = state;
  const { cartItems, shippingAddress, paymentMethod } = state.cart;
  const [loading,setLoading] = useState(false)

  const placeOrderHandler = async () => {
    try {
      setLoading(true)
        const { data } = await axios.post('/api/orders', {
            orderItems:cartItems.map(x  => ({...x,countInStock:undefined,slug:undefined})),
            shippingAddress,
            paymentMethod,
        },{
            headers:{authorization:`Bearer ${userInfo.token}`}
        })
        dispatch({type:"CART_CLEAR"})
        Cookies.remove('cartItems')
        setLoading(false)
        router.push(`/order/${data}`)
        
    } catch (error) {
      setLoading(false)
      alert(error)
    }
    router.push("/shipping");
  };

  useEffect(() => {
    if(!paymentMethod){
        router.push("/payment")
    }if(cartItems.length === 0){
        router.push("/cart")
    }
  },[cartItems,paymentMethod,router])
  return (
    <div className="bg-white pt-20">
      
        <div>
          <h1 className=" px-8 text-gray-700 text-3xl font-bold">
            Place Order
          </h1>

          <div className="mx-auto px-6 pt-8 pb-16 lg:px-8 max-w-4xl lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr]  lg:gap-12  ">
            <div className="rounded-lg p-6 lg:col-span-2 border shadow-md">
              <h1 className="text-gray-700 text-2xl font-semibold pb-4">
                Order Items
              </h1>

              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left text-gray-500 ">
                  <thead className="text-xs text-gray-700 capitalize border-b  ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Image
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Quantity
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr
                        key={item._id}
                        className="bg-white border-b"
                      >
                        <th
                          scope="row"
                          className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                        >
                          <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={urlForImage(item.image).url()}
                              alt={item.image.alt}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>
                        </th>
                        <td className="px-6 py-4">
                          <h3 className="text-gray-500 font-semibold">
                            <Link href={`product/${item.slug}`}>
                              {item.name}
                            </Link>
                          </h3>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-gray-500 font-semibold">{item.quantity}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p  className="text-gray-500 font-semibold">${item.price}</p>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

             
            </div>
            <div className="h-full rounded-lg border bg-white p-6 shadow-md lg:col-span-1">
              <h1 className="text-gray-700 text-2xl font-semibold pb-6">
                Order Summary
              </h1>
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Items</p>
                <p className="text-gray-700">
                  {cartItems.reduce((a, c) => a + c.quantity, 0)}
                </p>
              </div>
              <div className="mb-2 flex justify-between">
                <p className="text-gray-700">Subtotal</p>
                <p className="text-gray-700">
                  ${cartItems.reduce((a, c) => a + c.quantity * c.price, 0)}
                </p>
              </div>
              <hr className="my-4" />

              <button
                onClick={placeOrderHandler}
                className="mt-4 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              >
                {loading ? "Loading..." : "Place Order" }
                
              </button>
            </div>
            <div className="rounded-lg p-6 lg:col-span-2 border shadow-md ">
              <h1 className="text-gray-700 text-2xl font-semibold">
                Payment Method
              </h1>
              <div className="py-4 flex space-x-3 items-center">
                <CreditCardIcon
                  className="h-6 w-6 text-gray-700"
                  aria-hidden="true"
                />
                <p className=" text-gray-700 capitalize">{paymentMethod}</p>
              </div>
              <button
                onClick={() => router.push("/payment")}
                className="mt-2 p-6 rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              >
                Edit
              </button>
            </div>

            <div className="rounded-lg p-6 lg:col-span-2 border shadow-md ">
              <h1 className="text-gray-700 text-2xl font-semibold">
                Shipping Address
              </h1>
              <div className="pt-4 pb-2 flex space-x-3 items-center">
                <UserCircleIcon
                  className="h-6 w-6 text-gray-700"
                  aria-hidden="true"
                />
                <p className=" text-gray-700">{shippingAddress.name}</p>
              </div>
              <div className="py-2 flex space-x-3 items-center">
                <MapPinIcon
                  className="h-6 w-6 text-gray-700"
                  aria-hidden="true"
                />
                <p className=" text-gray-700">
                  {shippingAddress.address}, {shippingAddress.postalCode}
                </p>
              </div>
              <div className="py-2 flex space-x-3 items-center">
                <MapPinIcon
                  className="h-6 w-6 text-gray-700"
                  aria-hidden="true"
                />
                <p className=" text-gray-700">
                  {shippingAddress.city}, {shippingAddress.country}
                </p>
              </div>

              <button
                onClick={() => router.push("/shipping")}
                className="mt-2 p-6 rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600"
              >
                Edit
              </button>
            </div>
          </div>
        </div>
    </div>
  );
}

export default PlaceOrderPage;
