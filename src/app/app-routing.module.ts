import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './components/containers/create-order/create-order.component';
import { ViewOrderComponent } from './components/containers/view-order/view-order.component';
import { HomeComponent } from './components/home/home.component';
import { DeactivateGuardGuard } from './deactivate-guard.guard';
import { GuardGuard } from './guard.guard';
import { SingleOrderComponent } from './single-order/single-order.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create',
    component: CreateOrderComponent,
    canActivate: [GuardGuard],
    canDeactivate: [DeactivateGuardGuard],
  },
  {
    path: 'view',
    component: ViewOrderComponent,
    canActivate: [GuardGuard]
  },
  {
    path: 'single',
    component: SingleOrderComponent,
    canActivate: [GuardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
