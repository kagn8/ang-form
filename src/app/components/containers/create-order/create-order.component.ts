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
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { MainServiceService } from 'src/app/services/main-service.service';
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

  allOrdersSub!:IOrder[];

  emailIsValid = true;
  companyNameIsValid = true;
  phoneNumberIsValid = true;
  amountIsValid = true;
  machineTypeIsValid = true;

  countries: string[] = [];

  isValid = false;
  user!: IUser;

  openModal!:boolean

  constructor(
    private router: Router,
    private serv: MainServiceService,
    private auth:AuthServiceService
  ) {}

  ngOnInit(): void {

    this.auth.modalObs.subscribe(res => {console.log(res);
     this.openModal = !res})

    this.auth.deactivatorObs.subscribe(res => console.log(res))

    this.serv.getOrders().subscribe((res:any)=> this.orders = res)

    this.deleteMachine()
    console.log(this.orderForm.statusChanges.subscribe(res=> console.log(res)));

    this.serv.getCountries().subscribe((res: any) => {
      for (const country of res) {
        this.countries.push(country.name.common)
      }
      this.countries.sort((a, b) => a.localeCompare(b))
    });
    this.openModal =false
  }

  areYouSure() {
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
                    this.router.navigate(['view']);
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
              this.router.navigate(['/', 'view']);
            }, 1500);
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
          }
        });
      }
    }
  }

  submit() {
    console.log(this.orderForm.value.country);

    this.singleOrder = new Order(
      this.orderForm.value.amount,
      this.orderForm.value.companyName,
      this.orderForm.value.email,
      this.orderForm.value.machineType,
      this.orderForm.value.country,
      this.orderForm.value.phoneNumber
    );

    this.serv.postOrder(this.singleOrder).subscribe(res=>console.log(res))

   this.deleteMachine()
  }

  deleteMachine() {
    this.user = JSON.parse(localStorage.getItem('user')!);
    this.orderForm = new FormGroup({
      companyName: new FormControl(this.user.username, Validators.required),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email,
        Validators.pattern(
          /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      ]),
      phoneNumber: new FormControl(null,  [Validators.required]),
      machineType: new FormControl(null, Validators.required),
      country: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    });
  }
  nav = false
  
  guardCheck(){
    if (this.orderForm.value.phoneNumber != null || this.orderForm.value.amount != null || this.orderForm.value.country != null  || this.orderForm.value.machineType != null) {
      this.auth.deactivatorSubject.next(false)
      this.auth.deactivatorObs.subscribe(res => console.log(res))
    }else this.auth.deactivatorSubject.next(true), this.openModal= false
  }
  closeModal(){
    console.log(this.openModal);
    
    this.openModal = !this.openModal
  }
  yes(){
    this.auth.deactivatorSubject.next(true)
    this.openModal = !this.openModal
  }
}
