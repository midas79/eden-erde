import Link from "next/link";
import { SimplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";

async function getData(category: string) {
  const query = `*[_type == "product" && category->name == "${category}"] {
  _id,
  "imageUrl": images[0].asset->url,
    price,
    name,
    "slug": slug.current,
    "categoryName": category->name
}`;

  const data = await client.fetch(query);
  return data;
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
      <section className="container pt-[var(--space-3xl)]">
        <div className="flex flex-col gap-[var(--space-lg)] border-b border-[var(--color-rule)] pb-[var(--space-xl)]">
          <h1 className="max-w-[24ch]">{category}</h1>
          <p className="measure">
            {data.length} {data.length === 1 ? "piece" : "pieces"} set out in the shop.
          </p>
          <nav aria-label="The other ranges" className="flex flex-wrap items-center gap-x-[var(--space-lg)] gap-y-[var(--space-xs)] text-[var(--text-md)]">
            <Link href="/all" className="muted hover:text-[var(--color-ink)] underline-offset-4 hover:underline">
              All pieces
            </Link>
            <span className="muted" aria-hidden="true">/</span>
            <Link href="/Chairs" className={`hover:text-[var(--color-ink)] ${category === "Chairs" ? "underline decoration-[var(--color-accent)] underline-offset-4" : ""}`}>
              Chairs
            </Link>
            <span className="muted" aria-hidden="true">/</span>
            <Link href="/Couches" className={`hover:text-[var(--color-ink)] ${category === "Couches" ? "underline decoration-[var(--color-accent)] underline-offset-4" : ""}`}>
              Couches
            </Link>
            <span className="muted" aria-hidden="true">/</span>
            <Link href="/Tables" className={`hover:text-[var(--color-ink)] ${category === "Tables" ? "underline decoration-[var(--color-accent)] underline-offset-4" : ""}`}>
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
