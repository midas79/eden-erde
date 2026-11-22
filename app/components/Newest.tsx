import { SimplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getData() {
  const query = `*[_type == "product"][0...4] | order(_createdAt desc) {
        _id,
          price,
        name,
          "slug": slug.current,
          "categoryName": category->name,
          "imageUrl": images[0].asset->url
      }`;
  return await client.fetch(query);
}

export default async function Newest() {
  const data: SimplifiedProduct[] = await getData();

  return (
    <section className="section container">
      <div className="section-head">
        <p className="eyebrow">new arrivals</p>
        <h2>Newest furniture</h2>
      </div>

      <div className="grid-products">
        {data.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>

      <div style={{ marginTop: "var(--space-xl)" }}>
        <Link href="/all" className="btn btn--outline">
          See all products <ArrowRight size={16} aria-hidden="true" />
        </Link>
      </div>
    </section>
  );
}
