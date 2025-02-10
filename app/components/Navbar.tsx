"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useShoppingCart } from "use-shopping-cart";

const links = [
  { name: "Home", href: "/" },
  { name: "Chairs", href: "/Chairs" },
  { name: "Couches", href: "/Couches" },
  { name: "Tables", href: "/Tables" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { handleCartClick } = useShoppingCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="mb-8 border-b">
      <div className="flex items-center justify-between mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <Link href="/">
          <h1 className="text-2xl md:text-4xl font-bold">
            Eden<span className="text-gray-600">Erde</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex gap-12 2xl:ml-16">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`text-lg font-semibold transition duration-100 ${
                pathname === link.href
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Shopping Cart and Menu Button */}
        <div className="flex items-center">
          <Button
            variant={"ghost"}
            onClick={() => handleCartClick()}
            className="flex flex-col gap-y-1.5 h-12 w-12 sm:h-20 sm:w-20 md:h-24 md:w-24 rounded-none"
          >
            <ShoppingBag />
            <span className="text-xs font-semibold text-primary sm:block">
              Cart
            </span>
          </Button>
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-primary ml-4"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav
          className={`lg:hidden flex flex-col gap-4 p-4 bg-white border-t transition-[height,opacity] duration-500 ease-in-out overflow-hidden ${
            menuOpen ? "h-auto opacity-100" : "h-0 opacity-0"
          }`}
        >
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className={`text-lg font-semibold block ${
                pathname === link.href
                  ? "text-primary"
                  : "text-gray-600 hover:text-primary"
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
