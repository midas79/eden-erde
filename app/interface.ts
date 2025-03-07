import { SanityImageSource } from "@sanity/image-url/lib/types/types";

// Interface untuk produk yang disederhanakan
export interface SimplifiedProduct {
    _id: string;
    imageUrl: string;  // URL gambar utama
    price: number;
    slug: string;
    categoryName: string;
    name: string;
}

// Interface untuk produk penuh dengan lebih banyak detail
export interface FullProduct {
    _id: string;
    images: SanityImageSource[]; // Gunakan array SanityImageSource untuk gambar
    price: number;
    slug: string;
    categoryName: string;
    name: string;
    description: string;
    price_id: string;
}
