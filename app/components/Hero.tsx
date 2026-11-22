import Image from "next/image";
import { client, urlFor } from "../lib/sanity";
import Link from "next/link";

async function getData() {
  const query = "*[_type == 'heroImage'][0]";

  const data = await client.fetch(query);

  return data;
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

  return (
    <section className="hero container flex min-h-[calc(100dvh-var(--nav-h))] items-center pt-[var(--space-2xl)] pb-[var(--space-2xl)]">
      <div className="hero__grid grid w-full grid-cols-1 gap-x-[var(--gap-columns)] gap-y-[var(--space-2xl)] lg:grid-cols-[minmax(0,8fr)_minmax(0,4fr)] lg:items-start">
        {/* the corridor: the offer, then the room it lives in */}
        <div className="grid grid-cols-1 gap-y-[var(--space-xl)] sm:grid-cols-2 sm:items-start">
          <div className="stock">
            <h1 className="mb-[var(--space-md)]">
              Timeless Furniture, Inspired by Nature
            </h1>
            <p className="measure mb-[var(--space-lg)]">
              Furniture crafted to bring warmth and calm into your home.
            </p>
            <div className="flex flex-wrap items-center justify-between gap-[var(--space-md)]">
              <Link href="/all" className="btn">
                Shop the collection
              </Link>
              <div className="bands w-[var(--space-4xl)]" aria-hidden="true">
                <i></i>
                <i></i>
                <i></i>
                <i></i>
              </div>
            </div>
          </div>
          <div className="plate h-full">
            <Link href="/Couches" className="block h-full">
              <Image
                src={urlFor(data.image2).url()}
                alt="Gray Beige Couch in a sunlit room"
                className="aspect-[4/5] h-full w-full object-cover object-center sm:aspect-auto"
                width={1120}
                height={630}
                sizes="(max-width: 1024px) 100vw, 560px"
                priority
              />
            </Link>
          </div>
        </div>

        {/* the range: hairline rows, the counts the shop holds */}
        <nav aria-label="The range" className="range-col">
          <div className="range">
            <Link href="/Chairs" className="range__row">
              <span>Chairs</span>
              <span className="num">({counts.chairs ?? 0})</span>
            </Link>
            <Link href="/Couches" className="range__row">
              <span>Couches</span>
              <span className="num">({counts.couches ?? 0})</span>
            </Link>
            <Link href="/Tables" className="range__row">
              <span>Tables</span>
              <span className="num">({counts.tables ?? 0})</span>
            </Link>
          </div>
          <p className="mt-[var(--space-md)] text-sm">
            Pieces held in the shop today.
          </p>
        </nav>
      </div>
    </section>
  );
}
