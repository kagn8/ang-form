import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/iorder';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.scss'],
})
export class ViewOrderComponent implements OnInit {
  item = localStorage.getItem('order');
  home!:IOrder[];

  constructor(private serv: MainServiceService) {}

  ngOnInit(): void {
    if (this.item != null) {
      this.serv.home = JSON.parse(this.item);
      this.home = this.serv.home
      console.log(this.home);
    } else {
      this.home = [];
    }
  }

  delete(e: any) {
    this.home.splice(this.home.indexOf(e), 1);
    this.serv.home = this.home
    localStorage.removeItem('order');
    localStorage.setItem('order', JSON.stringify(this.home));
  }
}
