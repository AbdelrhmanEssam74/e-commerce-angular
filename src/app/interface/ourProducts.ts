export type Root = ourProducts[]

export interface ourProducts {
  id: number
  name: string
  description: string
  price: string
  brand: string
  category: string
  stock: number
  average_rating: string
  total_reviews: number
  images: string[]
}
