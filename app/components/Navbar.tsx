"use client";

import { useState } from "react";
import { ShoppingBag, Menu, X, Search } from "lucide-react";
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
    <header className="nav">
      <div className="container nav__row">
        <Link href="/" aria-label="EdenErde, home">
          <span className="wordmark">
            Eden<em>Erde</em>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="nav__links">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Search and Shopping Cart */}
        <div className="flex items-center gap-x-2">
          <Link href="/all" className="nav__search" aria-label="Search the collection">
            <Search size={16} aria-hidden="true" />
            <span>Search</span>
          </Link>
          <button
            type="button"
            onClick={() => handleCartClick()}
            className="nav__cart btn btn--quiet gap-x-2"
            aria-label="Open cart"
          >
            <ShoppingBag size={18} aria-hidden="true" />
            <span>Cart</span>
          </button>
          <button
            type="button"
            className="lg:hidden btn btn--quiet"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            {menuOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="lg:hidden container flex flex-col gap-y-3 pb-6 opacity-100 transition-[transform,opacity] duration-500 ease-in-out">
          {links.map((link, idx) => (
            <Link
              key={idx}
              href={link.href}
              className="block text-lg"
              aria-current={pathname === link.href ? "page" : undefined}
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
