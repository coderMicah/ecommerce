import ProductList from "@/components/ProductList";
import { client } from "../../sanity/lib/client";
import { productsQuery } from "../../sanity/lib/queries";

export default async function Home() {
  const products = await client.fetch(productsQuery);

  return <ProductList products={products} />;
}
