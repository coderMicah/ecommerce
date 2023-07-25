"use client";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { Store } from "@/utilis/Store";
import { client } from "../../sanity/lib/client";
import { productQueryById } from "../../sanity/lib/queries";


function Button({ id }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  
  const router = useRouter();

  const addToCartHandler = async () => {
    const existingItem = cart.cartItems.find((x) => x._id === id);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;

    const product = await client.fetch(productQueryById, { productId: id });

    if (product.countInStock < quantity) {
      alert("Sorry Product is Out Of Order");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _id: product._id,
        name: product.name,
        countInStock: product.countInStock,
        slug: product.slug.current,
        price: product.price,
        image: product.image,
        quantity,
      },
    });

    alert("Congratulations order placed");
    router.push("/cart");
    
  };
  return (
    <>
      {/* add to bag */}
      <button
        onClick={addToCartHandler}
        type="submit"
        className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add to bag
      </button>
    </>
  );
}

export default Button;
