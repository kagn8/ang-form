import { Component, OnInit } from '@angular/core';
import { IOrder } from '../iorder';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss']
})
export class SingleOrderComponent implements OnInit {
  order!:IOrder;
  item:any;

  constructor() { }

  ngOnInit(): void {
    this.order = JSON.parse(localStorage.getItem('singleOrder')!);
    console.log(this.order);
    
    
  }

}
