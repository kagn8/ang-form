import { Injectable } from '@angular/core';
import { IOrder } from '../iorder';

@Injectable({
  providedIn: 'root'
})
export class MainServiceService {

  home!:IOrder[]

  constructor() { }
}
