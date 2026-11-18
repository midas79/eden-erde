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
          <h1 className="!text-[var(--text-section)] max-w-[24ch]">All products</h1>
          <p className="measure">
            Every piece in the shop, newest first. Prices are what the shop charges.
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

        <div className="mt-[var(--space-2xl)] grid grid-cols-1 gap-x-[var(--gap-columns)] gap-y-[var(--space-2xl)] sm:grid-cols-2 lg:grid-cols-4">
          {data.map((product) => (
            <div key={product._id} className="group relative">
              <div className="aspect-square w-full overflow-hidden rounded-[2px] bg-gray-200 group-hover:opacity-75 lg:h-80">
                <Image
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-full object-cover object-center lg:h-full lg:w-full"
                  width={300}
                  height={300}
                />
              </div>

              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.slug}`}>
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    {product.categoryName}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900">
                  ${product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
