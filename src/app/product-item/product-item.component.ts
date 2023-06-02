import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../product-item-detail/product-item-detail.component';

export type OrderList = {
  id: number;
  amount: number;
};

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  @Input() item: Product | undefined;
  amount: number = 0;
  orderList: OrderList[] = [];
  constructor() {}
  ngOnInit(): void {}

  addToCart(id: number | undefined) {
    let dataProducts = localStorage.getItem('orderProductsList');
    this.orderList = dataProducts ? JSON.parse(dataProducts) : [];
    if (id && this.amount != 0) {
      this.orderList.push({ id: id, amount: this.amount });
    }
    localStorage.setItem('orderProductsList', JSON.stringify(this.orderList));
  }
}
