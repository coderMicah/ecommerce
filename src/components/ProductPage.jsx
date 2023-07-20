//next-components
import Link from "next/link";

//utilis
import { urlForImage } from "../../sanity/lib/image";

//components
import Reviews from "./Reviews";
import Button from "./Button";

//icons
import { ArrowLongLeftIcon } from "@heroicons/react/20/solid";
import { CheckCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";


function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ProductPage({ product }) {
  {
    return (
      <div className="bg-white">
        <div className="p-6">
          <Link href="/" className="group text-gray-700  ">
            <div className="flex gap-x-2 mx-2 px-2 md:px-3 lg:px-10 group-hover:text-blue-600">
              <ArrowLongLeftIcon className="w-6" />
              <span>Back To Products</span>
            </div>
          </Link>
          <div className="mx-auto mt-6 px-2 md:px-3 max-w-4xl lg:grid lg:max-w-7xl lg:grid-cols-2 lg:grid-rows-[auto,auto,1fr]  lg:gap-x-8 lg:px-8">
            {/* Image gallery */}
            <div className="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block lg:col-span-1">
              <img
                src={urlForImage(product.image).url()}
                alt={product.image.alt}
                className="h-full w-full object-cover object-center"
              />
            </div>

            {/* Product Details and Descriptions */}
            <div className="mt-4 lg:row-span-3 lg:col-span-1 lg:mt-0  ">
              <div className="lg:col-span-1">
                <h1 className="text-2xl font-bold tracking-tight mb-3 text-gray-900 sm:text-3xl">
                  {product.name}
                </h1>
              </div>

              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-gray-900">
                ${product.price}
              </p>

              {/* Reviews */}
              <Reviews />

              <div className="mt-4">
                {product.countInStock > 0 ? (
                  <div className="flex space-x-2 items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-600" />
                    <p className="text-gray-400 text-sm">
                      In Stock and Ready To Ship
                    </p>
                  </div>
                ) : (
                  <div className="flex space-x-2 items-center">
                    <XCircleIcon className="h-6 w-6 text-red-600" />
                    <p className="text-gray-400 text-sm">Unavailable For Now</p>
                  </div>
                )}
              </div>

              {/* More details */}
              <div className="py-10 lg:pb-16 lg:pt-6">
                <div>
                  <h3 className="sr-only">Description</h3>

                  <div className="space-y-6">
                    <p className="text-base text-gray-900">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* <div className="mt-10">
                <h3 className="text-sm font-medium text-gray-900">
                  Highlights
                </h3>

                <div className="mt-4">
                  <ul role="list" className="list-disc space-y-2 pl-4 text-sm">
                    {product.highlights.map((highlight) => (
                      <li key={highlight} className="text-gray-400">
                        <span className="text-gray-600">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div> */}

                <div className="mt-10">
                  <h2 className="text-sm font-medium text-gray-900">Details</h2>

                  <div className="mt-4 space-y-6">
                    <p className="text-sm text-gray-600">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
              
              <Button id={product._id}/>
             
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductPage;
