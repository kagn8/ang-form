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


  subject = new BehaviorSubject<boolean>(false)
  obs = this.subject.asObservable()
  
  numberSub = new BehaviorSubject<number>(0)
  numObs = this.numberSub.asObservable()

  getCountries(){
    return this.http.get('https://restcountries.com/v3.1/all')
  }
  getCountry(id:number){
    return this.http.get('https://restcountries.com/v3.1/all' + id)
  }

  getOrders(){
    return this.http.get('http://localhost:3000/orders')
  }
  getOrder(id:number){
    return this.http.get('http://localhost:3000/orders/' + id)
  }

  postOrder(order: IOrder){
    return this.http.post('http://localhost:3000/orders', order)
  }

  deleteOrder(id:number){
    return this.http.delete('http://localhost:3000/orders/'+ id)
  }

  patchOrder(id:number, order:Partial<IOrder>){
    return this.http.patch('http://localhost:3000/orders/'+id, order)
  }

}
