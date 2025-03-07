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
    <div className="grid gap-4 lg:grid-cols-5">
      {/* Thumbnail Image List */}
      <div className="order-last flex gap-6 lg:order-none lg:flex-col">
        {images.map((image, idx) => (
          <div
            key={image._id ?? idx}
            className="overflow-hidden rounded-lg bg-gray-100"
          >
            <Image
              src={urlFor(image).url()}
              width={200}
              height={200}
              alt="Thumbnail"
              className="h-full w-full object-cover object-center cursor-pointer"
              onClick={() => handleSmallImageClick(image)}
            />
          </div>
        ))}
      </div>

      {/* Big Image */}
      {bigImage ? (
        <div className="relative overflow-hidden rounded-lg bg-gray-100 lg:col-span-4">
          <Image
            src={urlFor(bigImage).url()}
            alt="Main Image"
            width={500}
            height={500}
            className="h-full w-full object-cover object-center"
            priority
          />
          <span className="absolute left-0 top-0 rounded-br-lg bg-red-500 px-3 py-1.5 text-sm uppercase tracking-wider text-white">
            Sale
          </span>
        </div>
      ) : (
        <p className="col-span-4 text-center text-gray-500">
          No images available
        </p>
      )}
    </div>
  );
}
