import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// Pastikan variabel lingkungan digunakan untuk keamanan
export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2022-03-07',
    useCdn: true,
});

const builder = imageUrlBuilder(client);

// Gunakan SanityImageSource sebagai tipe parameter
export function urlFor(source: SanityImageSource) {
    return builder.image(source);
}
