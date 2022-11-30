import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import { CreateOrderComponent } from './components/containers/create-order/create-order.component';
import { AuthServiceService } from './services/auth-service.service';


@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(private auth:AuthServiceService){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
    return this.auth.isAuthenticated();
  }


}

