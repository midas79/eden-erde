import Link from "next/link";
import { SimplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";

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
      <section className="container pt-[var(--space-3xl)]">
        <div className="flex flex-col gap-[var(--space-lg)] border-b border-[var(--color-rule)] pb-[var(--space-xl)]">
          <h1>All products</h1>
          <p className="measure">
            Every piece in the shop, newest first.
          </p>
          <nav aria-label="The range" className="flex flex-wrap items-center gap-x-[var(--space-lg)] gap-y-[var(--space-xs)] text-[var(--text-md)]">
            <Link href="/Chairs" className="muted hover:text-[var(--color-ink)]">
              Chairs
            </Link>
            <span className="muted" aria-hidden="true">/</span>
            <Link href="/Couches" className="muted hover:text-[var(--color-ink)]">
              Couches
            </Link>
            <span className="muted" aria-hidden="true">/</span>
            <Link href="/Tables" className="muted hover:text-[var(--color-ink)]">
              Tables
            </Link>
          </nav>
        </div>

        <div className="pieces mt-[var(--space-2xl)]">
          {data.map((product) => (
            <Link key={product._id} href={`/product/${product.slug}`} className="piece">
              <div className="plate">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="piece__img w-full object-cover object-center"
                  width={600}
                  height={750}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                />
              </div>
              <h3 className="piece__name">{product.name}</h3>
              <p className="piece__line">{product.categoryName}</p>
              <p className="piece__foot">
                <span className="num">${product.price}</span>
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
