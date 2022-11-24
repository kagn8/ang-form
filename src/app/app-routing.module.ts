import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './components/containers/create-order/create-order.component';
import { ViewOrderComponent } from './components/containers/view-order/view-order.component';
import { HomeComponent } from './components/home/home.component';
import { SingleOrderComponent } from './single-order/single-order.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'create',
    component: CreateOrderComponent
  },
  {
    path: 'view',
    component: ViewOrderComponent
  },
  {
    path: 'single',
    component: SingleOrderComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
