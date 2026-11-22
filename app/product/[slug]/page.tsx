import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckouNow";
import ImageGallery from "@/app/components/imageGallery";
import { FullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { Truck } from "lucide-react";

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
    <main id="main" className="container pt-[var(--space-3xl)] pb-[var(--section-gap)]">
      <Link href="/all" className="seeall">
        All products
      </Link>
      <div className="mt-[var(--space-xl)] split">
        <ImageGallery images={data.images} />
        <div className="lg:py-[var(--space-lg)]">
          <p className="piece__line mb-[var(--space-2xs)]">{data.categoryName}</p>
          <h1 className="!text-[var(--text-title)] lg:!text-[var(--text-2xl)]">
            {data.name}
          </h1>
          {/* the offer: the price held large, the actions beside it */}
          <div className="stock offer mt-[var(--space-lg)] mb-[var(--space-xl)]">
            <span className="offer__price num">${data.price}</span>
            <span className="offer__note num">
              Incl. Vat plus shipping
            </span>
            <div className="actions col-span-full">
              <AddToBag
                currency="USD"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                price_id={data.price_id}
              />
              <CheckoutNow
                currency="USD"
                description={data.description}
                image={data.images[0]}
                name={data.name}
                price={data.price}
                price_id={data.price_id}
              />
            </div>
          </div>
          <div className="mb-[var(--space-md)] flex items-center gap-[var(--space-xs)] text-[var(--color-muted)]">
            <Truck className="w-5 h-5" aria-hidden="true" />
            <span className="text-sm">2-4 day shipping</span>
          </div>
          <div className="measure text-[var(--color-ink-2)] whitespace-pre-line">
            {data.description}
          </div>
        </div>
      </div>
    </main>
  );
}
