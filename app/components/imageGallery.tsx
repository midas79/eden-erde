"use client";

import Image from "next/image";
import { urlFor } from "../lib/sanity";
import { useState } from "react";

// Definisikan tipe data yang lebih spesifik
interface ImageGalleryProps {
  images: { _id: string; asset: { _ref: string } }[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  // Tangani kasus jika `images` kosong
  const [bigImage, setBigImage] = useState(
    images.length > 0 ? images[0] : null
  );

  const handleSmallImageClick = (image: {
    _id: string;
    asset: { _ref: string };
  }) => {
    setBigImage(image);
  };

  return (
    <div className="grid gap-4">
      {/* Thumbnail Image List */}
      <div className="gallery__thumbs order-last">
        {images.map((image, idx) => (
          <button
            type="button"
            key={image._id ?? idx}
            className="gallery__thumb"
            aria-pressed={bigImage === image}
            aria-label={`View image ${idx + 1}`}
            onClick={() => handleSmallImageClick(image)}
          >
            <Image
              src={urlFor(image).url()}
              width={144}
              height={176}
              alt=""
              className="object-cover object-center"
            />
          </button>
        ))}
      </div>

      {/* Big Image */}
      {bigImage ? (
        <div className="plate">
          <div className="gallery__main" data-slot="product-main" data-alt="The piece photographed in the room">
            <Image
              src={urlFor(bigImage).url()}
              alt="Main Image"
              width={1200}
              height={1500}
              className="h-full w-full object-cover object-center"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-500">No images available</p>
      )}
    </div>
  );
}
