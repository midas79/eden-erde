"use client";

import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState } from "react";

interface ImageGalleryProps {
  images: { _id: string; asset: { _ref: string } }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [bigImage, setBigImage] = useState(images.length > 0 ? images[0] : null);

  return (
    <div style={{ display: "grid", gap: "var(--space-sm)" }}>
      {/* main image */}
      {bigImage ? (
        <div className="card">
          <div className="plate" style={{ aspectRatio: "4 / 5" }}>
            <Image
              src={urlFor(bigImage).url()}
              alt="Main product image"
              width={1200}
              height={1500}
              className="object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      ) : (
        <p className="text-muted">No images available</p>
      )}

      {/* thumbnails */}
      {images.length > 1 && (
        <div style={{ display: "flex", gap: "var(--space-sm)", flexWrap: "wrap" }}>
          {images.map((image, idx) => (
            <button
              type="button"
              key={image._id ?? idx}
              className="card"
              style={{
                width: 64, height: 80, padding: 0, cursor: "pointer",
                overflow: "hidden",
                outline: bigImage === image ? "2px solid var(--color-accent)" : "none",
                outlineOffset: 2,
              }}
              aria-pressed={bigImage === image}
              aria-label={`View image ${idx + 1}`}
              onClick={() => setBigImage(image)}
            >
              <Image
                src={urlFor(image).url()}
                width={128}
                height={160}
                alt=""
                className="object-cover object-center"
                style={{ width: "100%", height: "100%" }}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
