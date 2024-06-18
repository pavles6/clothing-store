
export type Size = "XS" | "S" | "M" | "L" | "XL" | "XXL";

export interface Product {
  name : string;
  price : number;
  description : string;
  image : string;
  category : string;
  id : number;
  size: Size;
  ratings?: number[] | undefined; // This is an array of ratings referenced by the rating id
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
}

export interface Db {
  products: Product[];
  users: User[];
  productRatings: ProductRating[];
}
