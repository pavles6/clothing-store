import { Component, computed, effect } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DbService } from '../db/db.service';
import { Product } from '../db/db.interface';
import { TagModule } from 'primeng/tag';
import { CartService } from '../cart/cart.service';
import { DecimalPipe } from '@angular/common';

export interface ProductListProduct extends Product {
  addToCart: (productId: number) => void;
  inCart: boolean;
  productRating: number;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CardModule, ButtonModule, TagModule, DecimalPipe],
  templateUrl: './product-list.component.html',
  providers: [DbService],
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: ProductListProduct[] = [];
  cart = computed(() => this.cartService.cart());

  addToCart = (productId: number): void => {
    const product = this.dbService.products.find(
      (product) => product.id === productId
    );
    this.cartService.addItemToCart(product as Product);
  };

  constructor(private dbService: DbService, private cartService: CartService) {
    effect(() => {
      this.products = this.dbService.products.map((product) => ({
        ...product,
        inCart: this.cartService.isProductInCart(product),
        addToCart: () => this.addToCart(product.id),
        productRating: this.dbService
          .getProductRatingsForProduct(product.id)
          .reduce<number>((acc, curr, i, products) => {
            if (i === products.length - 1) {
              return (acc += curr.rating) / products.length;
            }
            return (acc += curr.rating);
          }, 0),
      }));
    });
  }
}
