import AddToBag from "@/app/components/AddToBag";
import CheckoutNow from "@/app/components/CheckouNow";
import ImageGallery from "@/app/components/imageGallery";
import { FullProduct } from "@/app/interface";
import { client } from "@/app/lib/sanity";
import Link from "next/link";
import { ArrowLeft, Truck } from "lucide-react";

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
  return await client.fetch(query);
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
    <main id="main" className="container section" style={{ paddingTop: "var(--space-xl)" }}>
      <Link href="/all" className="btn btn--ghost btn--sm" style={{ marginBottom: "var(--space-lg)" }}>
        <ArrowLeft size={15} aria-hidden="true" /> All products
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "var(--space-2xl)",
          alignItems: "start",
        }}
      >
        <ImageGallery images={data.images} />

        <div>
          <p className="eyebrow" style={{ marginBottom: "var(--space-2xs)" }}>
            {data.categoryName}
          </p>
          <h1 style={{ fontSize: "var(--text-2xl)", marginBottom: "var(--space-md)" }}>
            {data.name}
          </h1>

          <div className="card" style={{ padding: "var(--space-lg)", marginBottom: "var(--space-lg)" }}>
            <div style={{ display: "flex", alignItems: "baseline", gap: "var(--space-md)", marginBottom: "var(--space-md)" }}>
              <span className="price price--large">${data.price}</span>
              <span className="meta">incl. vat + shipping</span>
            </div>
            <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
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

          <p className="meta" style={{ display: "flex", alignItems: "center", gap: "var(--space-2xs)", marginBottom: "var(--space-lg)" }}>
            <Truck size={15} aria-hidden="true" /> 2&ndash;4 day shipping
          </p>

          <div className="measure text-muted" style={{ whiteSpace: "pre-line" }}>
            {data.description}
          </div>
        </div>
      </div>
    </main>
  );
}
