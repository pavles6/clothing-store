import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    AvatarModule,
    InputTextModule,
    CommonModule,
    RippleModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
})
export class NavbarComponent {
  items: MenuItem[] = [
    {
      label: 'Home',
      icon: 'pi pi-fw pi-home',
      routerLink: '/',
    },
    {
      label: 'Cart',
      icon: 'pi pi-fw pi-shopping-cart',
      routerLink: '/cart',
    },
  ];
}
