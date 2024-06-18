import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DbService } from '../db/db.service';
import { Product } from '../db/db.interface';
import { TagModule } from 'primeng/tag';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CardModule, ButtonModule, TagModule],
  templateUrl: './product-list.component.html',
  providers: [DbService],
  styleUrl: './product-list.component.css',
})
export class ProductListComponent {
  products: Product[];
  constructor(db: DbService) {
    this.products = db.products;
  }
}
