"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import Image from "next/image";
import { useShoppingCart } from "use-shopping-cart";
import { toast } from "react-hot-toast";

// Buat interface CartEntry agar sesuai dengan struktur data cartDetails
interface CartEntry {
  id: string;
  name: string;
  price: number;
  image?: string;
  quantity: number;
  description?: string;
}

export default function ShoppingCartModel() {
  const {
    cartCount,
    shouldDisplayCart,
    handleCartClick,
    cartDetails,
    removeItem,
    totalPrice,
    redirectToCheckout,
  } = useShoppingCart();

  async function handleCheckoutClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();
    try {
      const result = await redirectToCheckout();
      if (result?.error) {
        toast.error("Failed to redirect to checkout.");
      }
    } catch (error) {
      toast.error("An error occurred during checkout.");
      console.error(error);
    }
  }

  return (
    <Sheet open={shouldDisplayCart} onOpenChange={(isOpen) => !isOpen && handleCartClick()}>
      <SheetContent className="sm:max-w-lg w-[90vw]">
        <SheetHeader>
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="h-full flex flex-col justify-between">
          <div className="mt-8 flex-1 overflow-y-auto">
            {cartCount === 0 ? (
              <h1 className="py-6">You don&rsquo;t have any items</h1>
            ) : (
              <ul className="sheet-list -my-6">
                {Object.values(cartDetails ?? {}).map((entry: CartEntry) => (
                  <li key={entry.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-[2px]">
                      <Image
                        src={entry.image as string}
                        alt={entry.name}
                        width={100}
                        height={100}
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-[var(--color-ink)]">
                          <h3 className="piece__name text-base">{entry.name}</h3>
                          <p className="ml-4 num">${entry.price.toFixed(2)}</p>
                        </div>
                        <p className="mt-1 text-sm text-[var(--color-muted)] line-clamp-2">
                          {entry.description}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <p className="text-[var(--color-muted)]">Qty: {entry.quantity}</p>
                        <div className="flex">
                          <button
                            type="button"
                            onClick={() => removeItem(entry.id)}
                            className="linkbtn text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          <div className="border-t border-[var(--color-rule)] px-4 py-6 sm:px-6">
            <div className="flex justify-between text-base font-medium text-[var(--color-ink)]">
              <p>Subtotal</p>
              <p className="num">${totalPrice?.toFixed(2) ?? "0.00"}</p>
            </div>
            <p className="mt-0.5 text-sm text-[var(--color-muted)]">
              Shipping and taxes are calculated at checkout.
            </p>
            <div className="mt-6">
              <button type="button" onClick={handleCheckoutClick} className="btn w-full">
                Checkout
              </button>
            </div>
            <div className="mt-6 flex justify-center text-center text-sm text-[var(--color-muted)]">
              <p>
                Or{" "}
                <button
                  type="button"
                  onClick={() => handleCartClick()}
                  className="linkbtn text-sm"
                >
                  Continue shopping
                </button>
              </p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
