import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { CreateOrderComponent } from './components/containers/create-order/create-order.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './components/home/home.component';
import { ViewOrderComponent } from './components/containers/view-order/view-order.component';
import { SingleOrderComponent } from './single-order/single-order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorInterceptor } from './interceptor.interceptor';
import { GridModule } from '@progress/kendo-angular-grid';
import { ButtonsModule } from '@progress/kendo-angular-buttons';



@NgModule({
  declarations: [
    AppComponent,

    CreateOrderComponent,
    HomeComponent,
    ViewOrderComponent,
    SingleOrderComponent,
    NavbarComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    GridModule,
    ButtonsModule
  ],
  exports: [ CreateOrderComponent ],
  providers: [{
    provide:HTTP_INTERCEPTORS, 
    useClass:InterceptorInterceptor,
    multi:true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
