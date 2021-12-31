// import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
// import  {Injectable} from '@angular/core'
// import { Observable } from 'rxjs';
// import { AuthService } from './AuthService';
// import { LocalStorageService } from './local-storage.service';


// @Injectable()
// export class TokenInterceptor implements HttpInterceptor {
//   constructor(public auth: AuthService) {}
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    
//     request = request.clone({
//       setHeaders: {
//         Authorization: `Bearer ${this.auth.getToken()}`
//       }
//     });
//     return next.handle(request);
//   }
// }

import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthService } from './AuthService';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  token: any;

      //  constructor(public auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // const token: string = sessionStorage.getItem('token');
        this.token = sessionStorage.getItem('token');

        // if (token) {
        //     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        // }

        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }

        // request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

        // return next.handle(request).pipe(
        //     map((event: HttpEvent<any>) => {
        //         if (event instanceof HttpResponse) {
        //             console.log('event--->>>', event);
        //         }
        //         return event;
        //     }));
        request = request.clone({
          setHeaders: {
            // Authorization: `Bearer 1BAF7E10-C37D-4753-AE2A-320509DE9C28-1971`
            Authorization: `Bearer `+this.token
          }
        });
        return next.handle(request);

    }
}
