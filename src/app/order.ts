import { IOrder } from './iorder';

export class Order implements IOrder {
  id?:number;
  amount: number;
  companyName: string;
  email: string;
  machineType: string;
  phoneNumber: number;
  creationDate: string;
  country: string;
  expirationDate: number;

  constructor(
    amount: number,
    companyName: string,
    email: string,
    machineType: string,
    country: string,
    phoneNumber: number
  ) {
    // this.id = id;
    this.amount = amount;
    this.companyName = companyName;
    this.email = email;
    this.machineType = machineType;
    this.country = country;
    this.phoneNumber = phoneNumber;
    this.creationDate = `${new Date().getDay()}/${new Date().getMonth()}/${new Date().getFullYear()} ${new Date().getHours()}:${new Date().getMinutes()}`;
    this.expirationDate = Date.now() + 300000;
  }
}
