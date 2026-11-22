import { SimplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import ProductCard from "../components/ProductCard";

async function getData() {
  const query = `*[_type == "product"] | order(_createdAt desc) {
  _id,
  "imageUrl": images[0].asset->url,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name
}`;
  return (await client.fetch(query)) as SimplifiedProduct[];
}

export const dynamic = 'force-dynamic';

export default async function AllPage() {
  const data = await getData();

  return (
    <div>
      <section className="section container" style={{ paddingTop: "var(--space-2xl)" }}>
        <div className="section-head">
          <p className="eyebrow">catalogue</p>
          <h1 style={{ fontSize: "var(--text-section)", marginBottom: "var(--space-xs)" }}>
            All products
          </h1>
          <p>Every piece in the shop, newest first. {data.length} items.</p>
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
