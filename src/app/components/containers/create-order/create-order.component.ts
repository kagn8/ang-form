import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  FormArray,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { IOrder } from 'src/app/iorder';
import { IUser } from 'src/app/Iuser';
import { Order } from 'src/app/order';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss'],
})
export class CreateOrderComponent implements OnInit {
  orderForm!: FormGroup;
  result: any;
  singleOrder!: IOrder;
  orders!: IOrder[];

  emailIsValid = true;
  companyNameIsValid = true;
  phoneNumberIsValid = true;
  amountIsValid = true;
  machineTypeIsValid = true;

  isValid = false;
  user!: IUser;

  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.orderForm = new FormGroup({
      companyName: new FormControl( this.user.username,  Validators.required),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      phoneNumber: new FormControl(null, [Validators.required, Validators.pattern('[- +()0-9]+{10}')
    ]),
      machineType: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });
    if (localStorage.getItem('order') != null) {
      this.orders = JSON.parse(localStorage.getItem('order')!);
    } else this.orders = [];
  }

  areYouSure() {
    console.log(this.orders.length);

    if (!this.orderForm.get('email')!.valid) {
      this.emailIsValid = false;
    } else this.emailIsValid = true;
    if (!this.orderForm.get('companyName')!.valid) {
      this.companyNameIsValid = false;
    } else this.companyNameIsValid = true;
    if (!this.orderForm.get('phoneNumber')!.valid) {
      this.phoneNumberIsValid = false;
    } else this.phoneNumberIsValid = true;
    if (!this.orderForm.get('amount')!.valid) {
      this.amountIsValid = false;
    } else this.amountIsValid = true;
    if (!this.orderForm.get('machineType')!.valid) {
      this.machineTypeIsValid = false;
    } else this.machineTypeIsValid = true;

    if (
      this.emailIsValid &&
      this.amountIsValid &&
      this.companyNameIsValid &&
      this.phoneNumberIsValid &&
      this.machineTypeIsValid
    ) {
      this.isValid = true;
    } else this.isValid = false;

    if (this.isValid == true) {
      if (this.orders.length > 0) {
        for (const order of this.orders) {
          console.log(order.email, this.user.email);

          if (order.email == this.user.email) {

            if (order.expirationDate <= Date.now()) {
              Swal.fire({
                title: 'Do you want to save the changes?',
                showDenyButton: true,
                showCancelButton: false,
                confirmButtonText: 'Save your order',
                denyButtonText: `Don't save`,
              }).then((result) => {
                if (result.isConfirmed) {
                  Swal.fire(
                    'Your order has been successfully registered',
                    '',
                    'success'
                  );
                  setTimeout(() => {
                    this.submit();
                    this.router.navigate(['/', 'single']);
                  }, 1500);
                } else if (result.isDenied) {
                  Swal.fire('Changes are not saved', '', 'info');
                }
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Error!',
                text: 'This user has already placed an order just now, wait at least 5 minutes between one order and another',
              });
            }
          } else{
            Swal.fire({
              title: 'Do you want to save the changes?',
              showDenyButton: true,
              showCancelButton: false,
              confirmButtonText: 'Save your order',
              denyButtonText: `Don't save`,
            }).then((result) => {
              if (result.isConfirmed) {
                Swal.fire(
                  'Your order has been successfully registered',
                  '',
                  'success'
                );
                setTimeout(() => {
                  this.submit();
                  this.router.navigate(['/', 'single']);
                }, 1500);
              } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info');
              }
            });
          }
        }
      } else {
        Swal.fire({
          title: 'Do you want to save the changes?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Save your order',
          denyButtonText: `Don't save`,
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Your order has been successfully registered',
              '',
              'success'
            );
            setTimeout(() => {
              this.submit();
              this.router.navigate(['/', 'single']);
            }, 1500);
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
          }
        });
      }
    }
  }

  submit() {
    this.singleOrder = new Order(
      this.orderForm.value.amount,
      this.orderForm.value.companyName,
      this.orderForm.value.email,
      this.orderForm.value.machineType,
      this.orderForm.value.phoneNumber
    );

    this.orders.push(this.singleOrder);

    localStorage.setItem('order', JSON.stringify(this.orders));
    localStorage.setItem('singleOrder', JSON.stringify(this.singleOrder));

    this.orderForm = new FormGroup({
      companyName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      phoneNumber: new FormControl(null, Validators.required),
      machineType: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });
  }

  deleteMachine() {
    this.orderForm = new FormGroup({
      companyName: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      phoneNumber: new FormControl(null, Validators.required),
      machineType: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });
  }
}
