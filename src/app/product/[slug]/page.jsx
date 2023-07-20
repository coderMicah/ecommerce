import ProductPage from "@/components/ProductPage";
import { client } from "../../../../sanity/lib/client";
import { productQuery } from "../../../../sanity/lib/queries";

async function Product({ params: slug }) {
  const product = await client.fetch(productQuery, slug);

  return <ProductPage product={product} />;
}

export default Product;
