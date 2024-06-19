import { Component, computed, effect } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DbService } from '../db/db.service';
import { Product } from '../db/db.interface';
import { TagModule } from 'primeng/tag';
import { CartService } from '../cart/cart.service';

export interface ProductListProduct extends Product {
  addToCart: (productId: number) => void;
  inCart: boolean;
}

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CardModule, ButtonModule, TagModule],
  templateUrl: './product-list.component.html',
  providers: [DbService],
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: ProductListProduct[] = [];
  cart = computed(() => this.cartService.cart());

  addToCart = (productId: number): void => {
    const product = this.db.products.find(
      (product) => product.id === productId
    );
    this.cartService.addItemToCart(product as Product);
  };

  constructor(private db: DbService, private cartService: CartService) {
    effect(() => {
      this.products = this.db.products.map((product) => ({
        ...product,
        inCart: this.cartService.isProductInCart(product),
        addToCart: () => this.addToCart(product.id),
      }));
    });
  }
}
