import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    let token = localStorage.getItem('token');
    console.log(token)
    if (token) {
      console.log('test')
      request = request.clone({
        headers: request.headers.set('Authorization',`bearer ${token}`),
      });

    }
    return next.handle(request);
  }
}
