import { Component, OnInit } from '@angular/core';

type Bill = {
  name: string;
  totalPrice: number;
};

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
})
export class ConfirmationComponent implements OnInit {
  billInformation: Bill | undefined;
  constructor() {}
  ngOnInit(): void {
    let bill = localStorage.getItem('bill');
    this.billInformation = bill ? JSON.parse(bill) : {};
    localStorage.setItem('bill', JSON.stringify({}));
  }
}
