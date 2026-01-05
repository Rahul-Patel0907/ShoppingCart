export interface Product {
    id: number;
    name: string;
    price: number;
    description: string;
    rating: number; // Rating added
    category: string;
    image: string;
}

export interface cartItem {
    product: Product;
    qty: number
}