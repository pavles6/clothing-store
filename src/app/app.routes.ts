import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { ProfilePageComponent } from './profile-page/profile-page.component';

export const routes: Routes = [
  {
    path: '',
    component: ProductListComponent,
  },
  {
    path: 'cart',
    component: CartPageComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
  },
];
