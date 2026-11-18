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
          <h1 className="!text-[var(--text-section)] max-w-[24ch]">
            Our {category} Products
          </h1>
          <p className="measure">
            {data.length} {data.length === 1 ? "piece" : "pieces"} set out in the shop,
            each one ours to keep. Prices are what the shop charges.
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
