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
  const { handleCartClick, cartCount } = useShoppingCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="nav">
      <a className="skip-link" href="#main">Skip to content</a>
      <div className="container nav__inner">
        <Link href="/" aria-label="EdenErde, home" className="nav__brand">
          Eden<span>Erde</span>
        </Link>

        <nav className="nav__links" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={pathname === link.href ? "page" : undefined}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="nav__actions">
          <Link href="/all" className="btn btn--ghost btn--sm" aria-label="Browse the collection">
            <Search size={15} aria-hidden="true" />
            <span className="hidden sm:inline">Browse</span>
          </Link>
          <button
            type="button"
            onClick={() => handleCartClick()}
            className="btn btn--outline btn--sm"
            aria-label={`Open cart, ${cartCount ?? 0} items`}
          >
            <ShoppingBag size={15} aria-hidden="true" />
            <span className="hidden sm:inline">Cart</span>
            {cartCount ? <span className="tag tag--accent">{cartCount}</span> : null}
          </button>
          <button
            type="button"
            className="btn btn--ghost btn--sm lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-label="Menu"
          >
            {menuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="dlg lg:hidden" role="dialog" aria-label="Menu">
          <button type="button" className="btn btn--ghost dlg__close" onClick={() => setMenuOpen(false)} aria-label="Close menu">
            <X size={20} aria-hidden="true" />
          </button>
          <nav className="dlg__links" aria-label="Mobile">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
