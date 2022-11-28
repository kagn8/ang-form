import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IOrder } from '../iorder';
import { IUser } from '../Iuser';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  constructor(private http:HttpClient) { }

  home:IOrder[] = []
  user!:IUser|null

  allOrdersSub = new BehaviorSubject<IOrder[]>(this.home)
  orderObs = this.allOrdersSub.asObservable()

  subject = new BehaviorSubject<boolean>(false)
  obs = this.subject.asObservable()


  getCountries(){

    return this.http.get('https://restcountries.com/v3.1/all')
  }



}
