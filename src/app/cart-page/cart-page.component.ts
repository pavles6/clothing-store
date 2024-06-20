import { Component, computed } from '@angular/core';
import { DataViewModule } from 'primeng/dataview';
import { CartService } from '../cart/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { DbService } from '../db/db.service';
import { TagModule } from 'primeng/tag';
import { Product } from '../db/db.interface';
@Component({
  selector: 'app-cart-page',
  standalone: true,
  imports: [DataViewModule, CurrencyPipe, ButtonModule, TagModule],
  templateUrl: './cart-page.component.html',
  styleUrl: './cart-page.component.css',
})
export class CartPageComponent {
  cart = computed(() =>
    this.cartService.cart().map((product) => ({
      ...product,
      productRating: this.dbService
        .getProductRatingsForProduct(product.id)
        .reduce<number>((acc, curr, i, products) => {
          if (i === products.length - 1) {
            return (acc += curr.rating) / products.length;
          }
          return (acc += curr.rating);
        }, 0),
    }))
  );

  removeCartItem(product: ProductCartProduct): void {
    this.cartService.removeItemFromCart(
      this.cartService
        .cart()
        .find((p: Product) => p.id === product.id) as Product
    );
  }

  constructor(private cartService: CartService, private dbService: DbService) {}
}

export interface ProductCartProduct extends Product {
  productRating: number;
}
