"use client";

import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { ProductCart } from "./AddToBag";

export default function CheckoutNow({
  name,
  description,
  image,
  price,
  currency,
  price_id,
}: ProductCart) {
  const { checkoutSingleItem } = useShoppingCart();
  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
    price_id,
  };
  return (
    <button
      type="button"
      className="btn btn--quiet"
      onClick={() => {
        checkoutSingleItem(product.price_id);
      }}
    >
      Checkout now
    </button>
  );
}
