import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.scss']
})
export class CreateOrderComponent implements OnInit {

  orderForm!: FormGroup
  result: any;
  orders!:any

  constructor(private formBuilder: FormBuilder) { 
    this.initForm();
  }

  ngOnInit(): void {
    this.orderForm= new FormGroup({
      companyName : new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      phoneNumber: new FormControl(null, Validators.required),
      machineType: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required, ),
    })
    if (localStorage.getItem('order') != null ) {
      this.orders = JSON.parse(localStorage.getItem('order')!);
    }else this.orders = []
  }

  private initForm() {
    this.orderForm = this.formBuilder.group({
      //Add form elements
    });
  }

  addMachine() {
    //Implement
  }

  submit() {
    this.orders.push(this.orderForm.value)

    
    localStorage.setItem('order', JSON.stringify(this.orders) )
    alert("Order created successfully")
    

    this.orderForm= new FormGroup({
      companyName : new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      phoneNumber: new FormControl(null, Validators.required),
      machineType: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    })
  }

  deleteMachine(){
    this.orderForm= new FormGroup({
      companyName : new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
      phoneNumber: new FormControl(null, Validators.required),
      machineType: new FormControl(null, Validators.required),
      amount: new FormControl(null, Validators.required),
    })

  }

}
