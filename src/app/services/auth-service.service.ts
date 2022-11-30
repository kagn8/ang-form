import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { MainServiceService } from './main-service.service';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {



  isLoggedIn = false
  canNav = true

  constructor(private serv : MainServiceService) { }
  
  deactivatorSubject = new BehaviorSubject<boolean>(true)
  deactivatorObs = this.deactivatorSubject.asObservable()

  modalSubject = new BehaviorSubject<boolean>(true)
  modalObs = this.modalSubject.asObservable()
  
  isAuthenticated(){
    this.serv.obs.subscribe(res=> this.isLoggedIn = res)
    return this.isLoggedIn
  }

  canNavigate(){
    this.deactivatorObs.subscribe(res=> this.canNav = res)
    return this.canNav
  }
}
