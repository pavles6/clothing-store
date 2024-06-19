import { Component, computed, effect } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { CommonModule } from '@angular/common';
import { AuthService } from '../auth/auth.service';
import { BadgeModule } from 'primeng/badge';
import { CartService } from '../cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [MenubarModule, CommonModule, BadgeModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items: MenuItem[] = [];
  authenticatedUser = computed(() => this.auth.authenticatedUser());
  cart = computed(() => this.cartService.cart());
  cartSize: number | null = null;

  INITIAL_MENUBAR_ITEMS: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      route: '/',
    },
    {
      label: 'Cart',
      icon: 'pi pi-fw pi-shopping-cart',
      route: '/cart',
      badge: 'true',
    },
    {
      label: 'Login',
      icon: 'pi pi-fw pi-sign-in',
      route: '/login',
    },
    {
      label: 'Register',
      icon: 'pi pi-fw pi-user-plus',
      route: '/register',
    },
    {
      label: 'More',
      items: [
        {
          label: 'Repository',
          icon: 'pi pi-fw pi-github',
          url: 'https://github.com/pavles6/clothing-store',
        },
      ],
    },
  ];

  AUTHENTICATED_MENUBAR_ITEMS = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      route: '/',
    },
    {
      label: 'Cart',
      icon: 'pi pi-fw pi-shopping-cart',
      route: '/cart',
      badge: '-1',
    },
    {
      label: 'Logout',
      icon: 'pi pi-fw pi-sign-out',
      command: () => {
        this.auth.logout();
      },
    },
    {
      label: 'More',
      items: [
        {
          label: 'Repository',
          icon: 'pi pi-fw pi-github',
          url: 'https://github.com/pavles6/clothing-store',
        },
      ],
    },
  ];

  constructor(private auth: AuthService, private cartService: CartService) {
    effect(() => {
      this.items =
        this.authenticatedUser() === null
          ? this.INITIAL_MENUBAR_ITEMS
          : this.AUTHENTICATED_MENUBAR_ITEMS;
    });

    effect(() => {
      this.cartSize = this.cart().length;
    });
  }
}
