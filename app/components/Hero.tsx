import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

async function getData() {
  const query = "*[_type == 'heroImage'][0]";
  return await client.fetch(query);
}

async function getCounts() {
  const query = `{
    "chairs": count(*[_type == "product" && category->name == "Chairs"]),
    "couches": count(*[_type == "product" && category->name == "Couches"]),
    "tables": count(*[_type == "product" && category->name == "Tables"])
  }`;
  return (await client.fetch(query)) as Record<string, number>;
}

export default async function Hero() {
  const data = await getData();
  const counts = (await getCounts()) ?? {};
  const total = (counts.chairs ?? 0) + (counts.couches ?? 0) + (counts.tables ?? 0);

  return (
    <section className="hero container">
      <div className="hero__grid">
        <div>
          <p className="hero__eyebrow">{"// furniture catalogue"}</p>
          <h1 className="hero__title">Timeless furniture, inspired by nature</h1>
          <p className="hero__lead">
            Pieces crafted to bring warmth and calm into your home. Browse the
            collection, add to cart, done.
          </p>
          <div className="hero__actions">
            <Link href="/all" className="btn btn--primary">
              Shop the collection <ArrowRight size={16} aria-hidden="true" />
            </Link>
            <Link href="/Chairs" className="btn btn--outline">
              View chairs
            </Link>
          </div>
          <p className="meta" style={{ marginTop: "var(--space-lg)" }}>
            {total} pieces in stock &middot; ships in 2&ndash;4 days
          </p>
        </div>

        <div className="card card--hover">
          <div className="plate">
            <Link href="/Couches">
              <Image
                src={urlFor(data.image2).url()}
                alt="Gray beige couch in a sunlit room"
                width={1120}
                height={1120}
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
