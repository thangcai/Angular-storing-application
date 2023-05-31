import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit{
  items: any;
  title: string = '';
  blogContent: string = '';
  public: boolean = false;
  constructor(private productService: ProductService) { }
  ngOnInit(): void {
    this.productService.getProducts().subscribe(data => {
      this.items = data;
      console.log(data);
    });
  }

  onSubmit(): void {
    // Your submit logic here (e.g., making an API call that sends form data)
  }
}
