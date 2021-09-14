import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationInterceptor } from './authentication.interceptor';
//import { FakeBackendInterceptor } from './fake-backend';
import { HttpErrorInterceptor } from './http-error.interceptor';
import { CacheInterceptor } from './cache.interceptor';

export const INTERCEPTORS = [
  //{ provide: HTTP_INTERCEPTORS, useClass: FakeBackendInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptor, multi: true }
];
