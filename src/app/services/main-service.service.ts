import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrder } from '../iorder';
import { IUser } from '../Iuser';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  home!:IOrder[]
  user!:IUser|null

  subject = new BehaviorSubject<boolean>(false)
  
  obs = this.subject.asObservable()

  constructor() { }
}
