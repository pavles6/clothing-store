export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface Product {
  name: string;
  price: number;
  description: string;
  image: string;
  category: string;
  id: number;
  size: Size;
}

export interface ProductRating {
  productId: number;
  userId: number;
  rating: number;
  comment: string;
}

export interface User {
  id: number;
  username: string;
  displayName: string;
  phoneNumber: string;
  email: string;
  country: string;
  city: string;
  address: string;
  zipCode: string;
}

export interface Db {
  products: Product[];
  cart: Product[];
  users: User[];
  productRatings: ProductRating[];
  authenticatedUser: User | null;
}
