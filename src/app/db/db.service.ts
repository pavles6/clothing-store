import { Injectable } from '@angular/core';
import {LocalStoragePreset} from "lowdb/browser"
import { LowSync } from 'lowdb';
import { Db, User } from './db.interface';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  private db: LowSync<Db>;

  constructor() {

      this.db = LocalStoragePreset<Db>('db', INITIAL_DB_DATA)

      this.db.write() // Save the initial data
  }

  get products() {
    return this.db.data.products
  }

  get users() {
    return this.db.data.users
  }

  get productRatings() {
    return this.db.data.productRatings
  }

  getUserById(id: number): User | null{
    return this.db.data.users.find(user => user.id === id) || null
  }



}

const INITIAL_DB_DATA: Db = {
  productRatings: [],
  users: [],
  products: [
    {
      name: "Classic White T-Shirt",
      price: 19.99,
      description: "A classic white t-shirt made from 100% cotton.",
      image: "https://www.sunspel.com/cdn/shop/products/mtsh0001-whaa-3.jpg?v=1676389968&width=1150",
      category: "Clothing",
      id: 1,
      size: "M"
    },
    {
      name: "Denim Jeans",
      price: 49.99,
      description: "Comfortable and stylish denim jeans.",
      image: "https://imgproxy.asket.com/e:1/width:1250/resize:fit/quality:85/aHR0cHM6Ly9kM212ZGhhb2wwNjJmeS5jbG91ZGZyb250Lm5ldC9kL2EvZi8yL2RhZjIxYTkyMjM2ZjY5MzYxZWYxYTgxZmIzODMxN2UyNmVkZmJiYjBfYXNrZXRfd2RqX21lX3NlYl9zbGlkZXNob3dfMDEuanBn.webp",
      category: "Clothing",
      id: 2,
      size: "L"
    },
    {
      name: "Black Hoodie",
      price: 39.99,
      description: "A warm black hoodie perfect for cold weather.",
      image: "https://assets.ajio.com/medias/sys_master/root/20230706/yiCl/64a616c9a9b42d15c939a335/-473Wx593H-466336868-black-MODEL.jpg",
      category: "Clothing",
      id: 3,
      size: "L"
    },
    {
      name: "Summer Dress",
      price: 29.99,
      description: "A light and breezy summer dress.",
      image: "https://m.media-amazon.com/images/I/71qqPTyiatS._AC_UY1000_.jpg",
      category: "Clothing",
      id: 4,
      size: "S"
    },
    {
      name: "Running Shoes",
      price: 59.99,
      description: "Comfortable running shoes for all terrains.",
      image: "https://hips.hearstapps.com/hmg-prod/images/run-nike-running-shoes-646cdd1a19c41.jpg?crop=0.6666666666666666xw:1xh;center,top&resize=1200:*",
      category: "Clothing",
      id: 5,
      size: "XL"
    },
    {
      name: "Woolen Scarf",
      price: 14.99,
      description: "A warm woolen scarf for chilly days.",
      image: "https://m.media-amazon.com/images/I/514kuUYOkxL._AC_UY350_.jpg",
      category: "Clothing",
      id: 6,
      size: "M"
    },
    {
      name: "Leather Jacket",
      price: 89.99,
      description: "A stylish leather jacket for a bold look.",
      image: "https://buffalojackson.com/cdn/shop/products/thompson-leather-moto-jacket-black-4_029f49bf-085e-4ca5-8cef-faef56e4ec35.jpg?v=1642952150&width=1080",
      category: "Clothing",
      id: 7,
      size: "M"
    },
    {
      name: "Casual Shorts",
      price: 24.99,
      description: "Comfortable shorts for casual wear.",
      image: "https://m.media-amazon.com/images/I/61Bi8BVh3EL._AC_UY1000_.jpg",
      category: "Clothing",
      id: 8,
      size: "L"
    },
    {
      name: "Formal Shirt",
      price: 34.99,
      description: "A crisp formal shirt for office wear.",
      image: "https://blackberrys.com/cdn/shop/files/printed-formal-shirt-in-blue-jedi-blackberrys-clothing-1_1200x1200.jpg?v=1685949827",
      category: "Clothing",
      id: 9,
      size: "XL"
    },
    {
      name: "Beanie Hat",
      price: 12.99,
      description: "A cozy beanie hat to keep you warm.",
      image: "https://marksandspencer.com.ph/cdn/shop/products/SD_03_T09_1830_T7_X_EC_0.jpg?v=1637835721",
      category: "Clothing",
      id: 10,
      size: "M"
    }
  ],
}
