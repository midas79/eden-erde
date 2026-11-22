import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import CartProvider from "./components/Providers";
import ShoppingCartModel from "./components/ShoppingCartModel";
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "EdenErde — Timeless Furniture, Inspired by Nature",
  description:
    "A furniture shop of timeless pieces: chairs, couches and tables crafted to bring warmth and calm into your home.",
  openGraph: {
    title: "EdenErde — Timeless Furniture, Inspired by Nature",
    description:
      "Chairs, couches and tables crafted to bring warmth and calm into your home.",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Lora:wght@400;500;600&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <CartProvider>
          <ShoppingCartModel/>
          <Navbar />
          {children}
        </CartProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
