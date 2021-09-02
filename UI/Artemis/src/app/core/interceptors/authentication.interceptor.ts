import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Observable, throwError, EMPTY } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OAuthService } from 'angular-oauth2-oidc';
import { authConfig } from '../../config/app.auth.config';
import { APP_CONFIG } from '../../config';
import { Router } from '@angular/router';
import { AppConfig } from 'src/app/shared/models/app-config/app-config.interface';
import { UsercontextService } from '../services/user-context/usercontext.service';
import { ToastService } from '../services/toast/toast.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationInterceptor implements HttpInterceptor {
  constructor(private oauthService: OAuthService, private toastService: ToastService, @Inject(APP_CONFIG) private appConfig: AppConfig, private router:Router, private userContextService: UsercontextService) { }
  intercept(project: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.appConfig.enablePing) {
      // Validating if Token is coming from the sso-dev Url affter getting refreshed
      if (project.url.indexOf(authConfig.issuer) == -1 && project.url.indexOf("blob.core.windows.net") == -1 && project.url !== 'error') {
        if (this.oauthService.hasValidAccessToken()) {

          const token = this.oauthService.getAccessToken();
          let changedProject = project;
          const headerSettings: { [name: string]: string | string[]; } = {};

          for (const key of project.headers.keys()) {
            headerSettings[key] = project.headers.getAll(key);
          }
          if (token) {
            headerSettings['Authorization'] = 'Bearer ' + token;
          }
          headerSettings['Content-Type'] = 'application/json';
          const newHeader = new HttpHeaders(headerSettings);

          changedProject = project.clone({
            headers: newHeader
          });
          return next.handle(changedProject).pipe(catchError((error: HttpErrorResponse) => {
            if (error.status == 401)
              this.toastService.error('You are not Authorized');
            return throwError(error);
          }));
        }
        else {

          this.toastService.info('PING session expired. Refreshing..');
          localStorage.setItem("ReferrerPage", this.router.url);
          window.location.reload();
          // this.oauthService.initLoginFlow();
          return EMPTY;
        }
      }
      else {
        return next.handle(project);
      }
    }
    else {
      const headerSettings: { [name: string]: string | string[]; } = {};
      for (const key of project.headers.keys()) {
        headerSettings[key] = project.headers.getAll(key);
      }
      if(this.userContextService.currentUser && this.userContextService.currentUser.user && this.userContextService.currentUser.user.email){
        headerSettings['UserEmail'] = this.userContextService.currentUser.user.email;
      }
      headerSettings['Content-Type'] = 'application/json';

      const newHeader = new HttpHeaders(headerSettings);
      let changedProject = project.clone({
        headers: newHeader
      });
      return next.handle(changedProject);
    }
  }
}
