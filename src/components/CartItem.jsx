import { useContext } from "react";
import { urlForImage } from "../../sanity/lib/image";
import Link from "next/link";
import { Store } from "@/utilis/Store";
import { client } from "../../sanity/lib/client";
import { productQueryById } from "../../sanity/lib/queries";

function CartItem({ item }) {
  const { dispatch } = useContext(Store);

  const updateCartHandler = async (item, quantity) => {
    const product = await client.fetch(productQueryById, {
      productId: item._id,
    });
    if (product.countInStock < quantity) {
      alert("Sorry Product is Out Of Order");
      return;
    }

    dispatch({
      type: "CART_ADD_ITEM",
      payload: {
        _id: item._id,
        name: item.name,
        countInStock: item.countInStock,
        slug: item.slug,
        price: item.price,
        image: item.image,
        quantity,
      },
    });

    alert(`${item.name} updated into Cart`);
  };

  const removeItem = async (item) => {
    dispatch({ type: "CART_REMOVE_ITEM", payload: item });
  };
  return (
    <div className="flex py-6">
      <div className="h-28 w-28 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={urlForImage(item.image).url()}
          alt={item.image.alt}
          className="h-full w-full object-cover object-center"
        />
      </div>

      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3>
              <Link href={`product/${item.slug}`}>{item.name}</Link>
            </h3>
            <p className="ml-4">{item.price}</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">{item.color}</p>
        </div>

        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500">Qty {item.quantity}</p>
          <select
            className="text-black text-sm border rounded-md border-gray-500 p-1"
            value={item.quantity}
            onChange={(e) => updateCartHandler(item, e.target.value)}
          >
            {[...Array(item.countInStock).keys()].map((x) => (
              <option key={x + 1} value={x + 1}>
                {x + 1}
              </option>
            ))}
          </select>

          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
              onClick={() => removeItem(item)}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
