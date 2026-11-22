import Link from "next/link";
import { SimplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import ProductCard from "../components/ProductCard";

async function getData(category: string) {
  const query = `*[_type == "product" && category->name == "${category}"] {
  _id,
  "imageUrl": images[0].asset->url,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name
}`;
  return await client.fetch(query);
}

export const dynamic = 'force-dynamic';

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data: SimplifiedProduct[] = await getData(category);

  return (
    <div>
      <section className="container section" style={{ paddingTop: "var(--space-2xl)" }}>
        <div className="section-head">
          <p className="eyebrow">collection</p>
          <h1 style={{ fontSize: "var(--text-section)", marginBottom: "var(--space-xs)" }}>
            {category}
          </h1>
          <p>
            {data.length} {data.length === 1 ? "piece" : "pieces"} set out in the shop.{" "}
            <Link href="/all" className="text-accent">Browse everything</Link>
          </p>
        </div>

        <div className="grid-products">
          {data.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
