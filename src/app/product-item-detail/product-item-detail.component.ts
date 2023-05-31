import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss']
})
export class ProductItemDetailComponent implements OnInit {
  item: any;
  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(res => {
      this.activatedRoute.params.subscribe(params => {
        this.item = res.find((product: any) => product.id == params['id']);
      });
    });
  }
}
