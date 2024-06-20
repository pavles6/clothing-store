import { Injectable, computed, signal } from '@angular/core';
import { DbService } from '../db/db.service';
import { Product } from '../db/db.interface';

export interface CartProduct extends Product {
  count: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = signal<CartProduct[]>(
    this.db.cart.map((cart) => ({ ...cart, count: 1 }))
  );

  cartCount = computed(() =>
    this.cart()
      .map((p) => p.count)
      .reduce((a, b) => a + b, 0)
  );

  constructor(private db: DbService) {}

  isProductInCart(product: Product): boolean {
    return this.cart().some((p) => p.id === product.id);
  }

  addItemToCart(product: Product): void {
    this.cart.update((cart) => {
      const existingProduct = cart.find((p) => p.id === product.id);

      if (!existingProduct) {
        const newCart = [...cart, { ...product, count: 1 }];
        this.db.cart = newCart;
        return newCart;
      }

      const newCart = cart.map((p) =>
        p.id === product.id ? { ...p, count: p.count + 1 } : p
      );
      this.db.cart = newCart;
      return newCart;
    });
  }

  removeItemFromCart(product: Product): void {
    const existingProduct = this.cart().find((p) => p.id === product.id);

    if (!existingProduct) {
      return;
    }

    if (existingProduct.count > 1) {
      this.cart.update((cart) => {
        const newCart = cart.map((p) =>
          p.id === product.id ? { ...p, count: p.count - 1 } : p
        );

        this.db.cart = newCart;
        return newCart;
      });
      return;
    }

    this.cart.update((cart) => {
      const newCart = cart.filter((p) => p.id !== product.id);
      this.db.cart = newCart;
      return newCart;
    });
  }
}
