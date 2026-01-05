export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number;
    ratingCount?: number; // Count of ratings
    category: string;
    image: string;
}

export interface cartItem {
    product: Product;
    qty: number
}