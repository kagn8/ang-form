import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUser } from 'src/app/Iuser';
import { MainServiceService } from 'src/app/services/main-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor( private serv: MainServiceService, private route: Router) { }

  user!:IUser|null;
  signUp!:boolean

  UserForm!:FormGroup;


  ngOnInit(): void {
   this.serv.obs.subscribe(res => this.signUp=res)

   this.UserForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email, Validators.pattern(
        /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      ),]),
   })
   this.user= JSON.parse(localStorage.getItem('user')!)
   console.log(this.UserForm);
   
  }
  signIn(){
    this.user = {
      username: this.UserForm.value.username,
      email: this.UserForm.value.email,
    }

    this.serv.subject.next(true)

    localStorage.setItem('user', JSON.stringify(this.user))

    this.route.navigate(['/', 'create'])
    
  }

}
