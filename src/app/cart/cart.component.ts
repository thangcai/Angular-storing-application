import { Component, OnInit, AfterViewChecked } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';
import { OrderList } from '../product-item/product-item.component';
import { Product } from '../product-item-detail/product-item-detail.component';
import { NgForm } from '@angular/forms';

export type ProductInCart = {
  id: number;
  name: string;
  price: number;
  url: string;
  description: string;
  amount: number;
};

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit, AfterViewChecked {
  title: string = '';
  blogContent: string = '';
  public: boolean = false;
  orderList: OrderList[] = [];
  orderListShow: ProductInCart[] = [];
  result = new Map();
  amount: number = 1;
  totalPrice: number = 0;
  fullname: string = '';
  address: string = '';
  credit: number = 0;
  creditCardError: boolean = false;
  messageError: string[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    let dataProducts = localStorage.getItem('orderProductsList');
    this.orderList = dataProducts ? JSON.parse(dataProducts) : [];
    this.orderList.forEach((element) => {
      if (this.result.get(element.id))
        this.result.set(
          element.id,
          this.result.get(element.id) + element.amount
        );
      else this.result.set(element.id, element.amount);
    });
    let listObject = Array.from(this.result).map(([id, amount]) => ({
      id,
      amount,
    }));
    this.productService.getProducts().subscribe((data) => {
      data.forEach((x: Product) => {
        listObject.forEach((y: OrderList) => {
          if (x.id === y.id) {
            this.orderListShow.push({ ...x, ...y });
          }
        });
      });
    });
  }

  ngAfterViewChecked() {
    this.calcuTotalPrice();
  }

  calcuTotalPrice() {
    this.totalPrice = 0;
    this.orderListShow.forEach((order) => {
      const myElement = document.getElementById('price' + order.id);
      let totalItemPrice = myElement ? myElement.innerHTML : '0';
      this.totalPrice += Number(totalItemPrice.replace('$', ''));
    });
  }

  IsMatchingCard(str: string) {
    var myRegExp = /^[0-9_-]{16}$/;
    return myRegExp.test(str);
  }

  validate(form: NgForm) {
    this.messageError = [];
    let fullnameError = form.controls['fullname'].errors;
    let addressError = form.controls['address'].errors;
    this.creditCardError = !this.IsMatchingCard(form.value.credit);

    if (fullnameError) {
      if (fullnameError['required']) {
        this.messageError.push('Fullname is required!');
      }
      if (fullnameError['minlength']) {
        this.messageError.push('Fullname is at least 3 characters!');
      }
    }
    if (addressError) {
      if (addressError['required']) {
        this.messageError.push('Address is required!\n');
      }
      if (addressError['minlength']) {
        this.messageError.push('Address is at least 6 characters!');
      }
    }
    if (this.creditCardError) {
      this.messageError.push('The credit card number must be 16-digit number.');
    }
  }

  deleteProduct(id: number | undefined) {
    this.orderListShow = this.orderListShow.filter(item => item.id !== id);
    this.calcuTotalPrice();
    localStorage.setItem('orderProductsList', JSON.stringify(this.orderListShow));
  }

  onSubmit(form: NgForm) {
    if (this.totalPrice != 0) {
      let bill = {
        name: form.value.fullname,
        totalPrice: this.totalPrice.toFixed(2),
      };
      localStorage.setItem('bill', JSON.stringify(bill));
      localStorage.setItem('orderProductsList', JSON.stringify([]));
      if (!this.creditCardError) {
        this.router.navigate(['/confirmation']);
      }
    }
  }
}
