import { catchError } from 'rxjs/operators';
import { HttpRequest, HttpInterceptor, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { ToastService } from '../services/toast/toast.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  serverErrorMessage = "Oops, something went wrong!";
  noDataError = "Sample image details does not exist";
  constructor(private toastService: ToastService) { }
  intercept(project: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(project)
      .pipe(
        catchError((httpError: HttpErrorResponse) => {
          if (httpError.status === 404 && httpError.error === this.noDataError) {
            return throwError(httpError);
          }
          this.toastService.error(this.serverErrorMessage);
          const loading: any = document.getElementsByClassName('k-i-loading');
          if (loading && loading[0])
            loading[0].style.display = 'none';
          return throwError(httpError);
        })
      )
  }
}
