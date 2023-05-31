import { Component, Input, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  items = [];
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.items = data;
      console.log(data);
    });
  }
}
