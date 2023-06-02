import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { OrderList } from '../product-item/product-item.component';

export type Product = {
  id: number;
  name: string;
  price: number;
  url: string;
  description: string;
};

@Component({
  selector: 'app-product-item-detail',
  templateUrl: './product-item-detail.component.html',
  styleUrls: ['./product-item-detail.component.scss'],
})
export class ProductItemDetailComponent implements OnInit {
  item: Product | undefined;
  orderList: OrderList[] = [];
  amount: number = 0;
  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.productService.getProducts().subscribe((res) => {
      this.activatedRoute.params.subscribe((params) => {
        this.item = res.find((product: any) => product.id == params['id']);
      });
    });
  }

  addToCart(id: number | undefined) {
    let dataProducts = localStorage.getItem('orderProductsList');
    this.orderList = dataProducts ? JSON.parse(dataProducts) : [];
    if (id && this.amount != 0) {
      this.orderList.push({ id: id, amount: this.amount });
    }
    localStorage.setItem('orderProductsList', JSON.stringify(this.orderList));
  }
}
