import { Component, OnInit } from '@angular/core';
import { Product } from '../core/product';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService) {}

  getProducts(): void {
    this.productService.getProducts().subscribe((res) => {
      this.products = res;
    });
  }

  ngOnInit() {
    this.getProducts();
  }
}
