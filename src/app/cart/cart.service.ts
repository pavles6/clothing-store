import { Injectable, signal } from '@angular/core';
import { DbService } from '../db/db.service';
import { Product } from '../db/db.interface';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<Product[]>(this.db.cart);

  constructor(private db: DbService) {}

  isProductInCart(product: Product): boolean {
    return this.cart().some((p) => p.id === product.id);
  }

  addItemToCart(product: Product): void {
    this.cart.update((cart) => {
      const newCart = [...cart, product];
      this.db.cart = newCart;
      return newCart;
    });
  }
}
