import Image from "next/image";
import Link from "next/link";
import { SimplifiedProduct } from "../interface";

export default function ProductCard({ product }: { product: SimplifiedProduct }) {
  return (
    <Link href={`/product/${product.slug}`} className="card card--hover piece block">
      <div className="plate">
        <Image
          src={product.imageUrl}
          alt={product.name}
          width={600}
          height={750}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
      </div>
      <div style={{ padding: "var(--space-md) var(--space-md) var(--space-lg)" }}>
        <p className="meta" style={{ marginBottom: "var(--space-2xs)" }}>
          {product.categoryName}
        </p>
        <h3 style={{ fontSize: "var(--text-md)", marginBottom: "var(--space-xs)" }}>
          {product.name}
        </h3>
        <p className="price price--small">${product.price}</p>
      </div>
    </Link>
  );
}
