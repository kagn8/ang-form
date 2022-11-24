import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormpartComponent } from './components/formpart/formpart.component';
import { CreateOrderComponent } from './components/containers/create-order/create-order.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ViewOrderComponent } from './components/containers/view-order/view-order.component';

@NgModule({
  declarations: [
    AppComponent,
    FormpartComponent,
    CreateOrderComponent,
    HomeComponent,
    ViewOrderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [ CreateOrderComponent ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
