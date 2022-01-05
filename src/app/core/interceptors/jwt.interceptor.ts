import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const langId = localStorage.getItem('langId');
    if (token) {
      request = request.clone({
        setHeaders: {
          'Accept': `application/json`,
          Authorization: `Bearer ${token}`,
          'Access-Control-Allow-Origin': environment.siteURL,
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
          'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
          'Access-Control-Allow-Credentials': 'true',
        }
      });
    }
    if (langId) {
      request = request.clone({
        setHeaders: {
          LangId: langId
        }
      });
    }



    return next.handle(request);
  }
}
