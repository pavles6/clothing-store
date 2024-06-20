import { Component, computed, signal } from '@angular/core';
import { DbService } from '../db/db.service';
import { Router } from '@angular/router';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';
import { CartService } from '../cart/cart.service';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { CurrencyPipe, DecimalPipe } from '@angular/common';
import { DividerModule } from 'primeng/divider';
import { ProductRating, User } from '../db/db.interface';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

type UserModelKeysToDisplay = {
  [key in keyof User]: string;
};

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [
    StepperModule,
    ButtonModule,
    DataViewModule,
    TagModule,
    CurrencyPipe,
    DecimalPipe,
    DividerModule,
    FormsModule,
    ReactiveFormsModule,
    RatingModule,
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {
  user = signal(this.dbService.authenticatedUser);
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

  productRatingForm = new FormGroup({
    rating: new FormControl('', [Validators.required]),
    comment: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });

  goToProfile() {
    this.router.navigate(['/profile']);
  }

  goToHome() {
    this.router.navigate(['/']);
  }

  addRating(productId: number): void {
    const rating: ProductRating = {
      productId,
      rating: Number(this.productRatingForm.get('rating')?.value),
      comment: this.productRatingForm.get('comment')?.value as string,
      userId: (this.user() as User).id,
    };

    const outcome = this.dbService.setProductRating(rating);

    if (outcome) {
      this.ratingSubmitSuccess();
    } else {
      this.ratingSubmitFail();
    }
  }

  getTotalPrice(): number {
    return this.cart().reduce((acc, curr) => acc + curr.price * curr.count, 0);
  }

  userHasValidShippingInfo(): boolean {
    const user = this.user() as User;
    return (
      user.address.length > 0 &&
      user.city.length > 0 &&
      user.country.length > 0 &&
      user.zipCode.length > 0 &&
      user.phoneNumber.length > 0 &&
      user.email.length > 0
    );
  }

  userModelKeysToDisplay: UserModelKeysToDisplay = {
    username: 'Username',
    displayName: 'Your Name',
    phoneNumber: 'Phone Number',
    email: 'Email',
    country: 'Country',
    address: 'Shipping Address',
    zipCode: 'Zip Code',
    city: 'City',
    id: 'N/A',
  };

  getUserData(): string[] {
    const grouped = {
      keys: Object.keys(this.user() as User)
        .map((key: string) => {
          const res =
            this.userModelKeysToDisplay[key as keyof UserModelKeysToDisplay];
          if (key === 'id') return '';
          return res;
        })
        .filter((val) => val.length > 0),
      values: Object.entries(this.user() as User)
        .map(([key, value]) => {
          if (key !== 'id') {
            if (value.length > 0) return value;
            return 'N/A';
          }
          return '';
        })
        .filter((val) => val.length > 0),
    };

    const output = [];
    for (let i in grouped.keys) {
      output.push(`${grouped.keys[i]}: ${grouped.values[i]}`);
    }

    return output;
  }

  ratingSubmitFail() {
    this.messageService.add({
      severity: 'error',
      summary: 'Rating submission failed',
      detail: 'You have already rated this product',
    });
  }

  ratingSubmitSuccess() {
    this.messageService.add({
      severity: 'success',
      summary: 'Rating submitted',
      detail: 'Thank you for your feedback',
    });
  }

  constructor(
    private dbService: DbService,
    private router: Router,
    private cartService: CartService,
    private messageService: MessageService
  ) {
    if (!this.user() || this.cart().length === 0) {
      this.router.navigate(['/']);
    }
  }
}
