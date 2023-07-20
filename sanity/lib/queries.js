import { groq } from "next-sanity";

// Get all products
export const productsQuery = groq`*[_type == "product"]{
    ...,
  } | order(_createdAt desc)`;

// Get a single product by its slug
export const productQuery = groq`*[_type == "product" && slug.current == $slug][0]{ 
  ...,
  }`;
// Get a single product by its id
export const productQueryById = groq`*[_type == "product" && _id == $productId][0]{ 
  ...,
  }`;

// Get all post slugs
export const postPathsQuery = groq`*[_type == "post"]{
  slug
}`;
