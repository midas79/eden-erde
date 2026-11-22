import Link from "next/link";
import { SimplifiedProduct } from "../interface";
import { client } from "../lib/sanity";
import Image from "next/image";

async function getData() {
  const query = `*[_type == "product"][0...4] | order(_createdAt desc) {
        _id,
          price,
        name,
          "slug": slug.current,
          "categoryName": category->name,
          "imageUrl": images[0].asset->url
      }`;

  const data = await client.fetch(query);

  return data;
}

export default async function Newest() {
  const data: SimplifiedProduct[] = await getData();

  return (
    <section className="section container">
      <div className="flex items-baseline justify-between gap-[var(--space-md)] border-b border-[var(--color-rule)] pb-[var(--space-sm)]">
        <h2>Newest furniture</h2>

        <Link className="seeall" href="/all">
          See all
        </Link>
      </div>

      <div className="pieces mt-[var(--space-xl)]">
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
  );
}
