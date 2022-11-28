import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const Newrequest= request.clone({
    //   headers: request.headers.append('X-RapidAPI-Key', '35fc762a62msh5518d6d91320cf0p14cbc7jsn8dc03e763645')
    // })
    return next.handle(request);
  }


}
