import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckouNow";
import ImageGallery from "@/app/components/imageGallery";
import { FullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { Star, Truck } from "lucide-react";

async function getData(slug: string) {
  const query = `*[_type == "product" && slug.current == "${slug}"][0] {
        _id,
        images,
        price,
        name,
        description,
        "slug": slug.current,
        "categoryName": category->name,
        price_id
    }`;

  const data = await client.fetch(query);

  return data;
}

export const dynamic = 'force-dynamic';

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data: FullProduct = await getData(slug);
  return (
    <div>
      <div className="mx-auto max-w-screen-xl px-4 md:px-8 pt-[var(--space-2xl)]">
        <Link href="/all" className="text-sm text-[var(--color-muted)] hover:text-[var(--color-ink)]">
          All products
        </Link>
        <div className="mt-[var(--space-xl)] grid gap-8 md:grid-cols-2">
          <ImageGallery images={data.images} />
          <div className="md:py-8">
            <div className="mb-2 md:mb-3">
              <span className="mb-0.5 inline-block text-gray-500">
                {data.categoryName}
              </span>
              <h2 className="text-2xl font-bold text-gray-800 lg:text-3xl">
                {data.name}
              </h2>
            </div>
            <div className="mb-6 flex items-center gap-3 md:mb-10">
              <span className="inline-flex items-center gap-x-2 border border-[var(--color-rule)] rounded-full px-3 py-1">
                <span className="text-sm num">4.2</span>
                <Star className="h-4 w-4" aria-hidden="true" />
              </span>
              <span className="text-sm text-gray-500 transition duration-100">
                56 Ratings
              </span>
            </div>
            {/* the offer: the price held large, the actions beside it */}
            <div className="stock px-[var(--space-xl)] py-[var(--space-lg)] mb-[var(--space-xl)]">
              <div className="flex flex-wrap items-end gap-x-[var(--space-lg)] gap-y-[var(--space-sm)]">
                <span className="offer__price">${data.price}</span>
                <span className="mb-1 text-[var(--color-muted)] line-through num text-sm">
                  ${data.price + 30}
                </span>
                <span className="mb-1 text-sm text-[var(--color-muted)]">
                  Incl. Vat plus shipping
                </span>
              </div>
              <div className="mt-[var(--space-lg)] flex gap-2.5">
                <AddToBag
                  currency="USD"
                  description={data.description}
                  image={data.images[0]}
                  name={data.name}
                  price={data.price}
                  key={data._id}
                  price_id={data.price_id}
                />
                <CheckoutNow
                  currency="USD"
                  description={data.description}
                  image={data.images[0]}
                  name={data.name}
                  price={data.price}
                  key={data._id}
                  price_id={data.price_id}
                />
              </div>
            </div>
            <div className="mb-6 flex items-center gap-2 text-gray-500">
              <Truck className="w-6 h-6" aria-hidden="true" />
              <span className="text-sm">2-4 Day Shipping</span>
            </div>
            <div className="measure text-base text-[var(--color-ink-2)] whitespace-pre-line">
              {data.description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
