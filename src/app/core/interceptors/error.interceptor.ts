import { Injectable, isDevMode } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private messageService: MessageService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        if (isDevMode())
          console.log(":::Error Interceptor",error);
        if (error) {
          switch (error.status) {
            case 400:
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors.flat();
              } else if (typeof (error.error) === "object") {
                this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: error.error, life: 3000 });
              } else {
                this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: error.error.errors, life: 3000 });
              }
              break;
            case 401:
              this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: error.error.errors, life: 3000 });
              this.router.navigate(['Account/Login'], { queryParams: { returnUrl: this.router.url } });
              break;
            case 404:
              this.router.navigateByUrl('Error/Not-Found');
              break;
            case 500:
              const navigationExtras: NavigationExtras = { state: { error: error.error } };
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;
            default:
              this.messageService.add({ severity: 'error', summary: 'İşlem Başarısız', detail: error.error.errors, life: 3000 });
              break;
          }
        }
        return throwError(error);
      })
    );
  }
}
