import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { IOrder } from '../iorder';
import { Order } from '../order';
import { MainServiceService } from '../services/main-service.service';

@Component({
  selector: 'app-single-order',
  templateUrl: './single-order.component.html',
  styleUrls: ['./single-order.component.scss'],
})
export class SingleOrderComponent implements OnInit {
  order!: IOrder;
  item: any;
  id!: number;

  patchForm!: FormGroup;

  constructor(private serv: MainServiceService, private route: Router) {}

  ngOnInit(): void {
    this.item = Number(localStorage.getItem('single'));

    this.serv.numObs.subscribe((res) => (this.id = res));

    this.patchForm = new FormGroup({
      machineType: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });
    this.serv.getOrder(this.item).subscribe((res: any) => {
      this.order = res;
    });
  }

  patchOrder() {
    this.order = new Order(
      this.patchForm.value.amount,
      this.order.companyName,
      this.order.email,
      this.patchForm.value.machineType,
      this.order.country,
      this.order.phoneNumber
    );
    this.serv
      .patchOrder(this.id, this.order)
      .subscribe((res) => console.log(res));
    Swal.fire('order changed successfully');
    this.route.navigate(['/view']);
  }
}
