// app/interface/product.ts
export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  brand: string;
  category: string;
  stock: number;
  average_rating: string;
  total_reviews: number;
  created_at: string;
  updated_at: string;
  image?: string; 
  images?: string[]; 
  originalPrice?: string;
}