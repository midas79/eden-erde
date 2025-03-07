export interface SimplifiedProduct {
    _id: string;
    imageUrl: string; 
    price: number;
    slug: string;
    categoryName: string;
    name: string;
}

export interface FullProduct {
    _id: string;
    images: { _id: string; asset: { _ref: string } }[];
    price: number;
    name: string;
    description: string;
    slug: string;
    categoryName: string;
    price_id: string;
}