"use client";

import { Button } from "@/components/ui/button";
import { useShoppingCart } from "use-shopping-cart";
import { urlFor } from "../lib/sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

export interface ProductCart {
  name: string;
  description: string;
  price: number;
  currency: string;
  image: SanityImageSource;
  price_id: string;
}

export default function AddToBag({
  name,
  description,
  image,
  price,
  currency,
  price_id
}: ProductCart) {
  const { addItem, handleCartClick } = useShoppingCart();
  const product = {
    name,
    description,
    price,
    currency,
    image: urlFor(image).url(),
    price_id,
  };

  return (
    <Button
      onClick={() => {
        addItem(product);
        handleCartClick();
      }}
    >
      Add To Cart
    </Button>
  );
}