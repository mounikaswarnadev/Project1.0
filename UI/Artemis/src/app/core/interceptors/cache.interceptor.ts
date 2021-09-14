import { HttpRequest, HttpInterceptor, HttpHandler, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { authConfig } from 'src/app/config/app.auth.config';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler) {

        if (req.url.indexOf(authConfig.issuer) == -1) {
            const httpProject = req.clone({
                headers: new HttpHeaders({
                    'Cache-Control': 'no-cache'
                })
                    .set('If-Modified-Since', '0')
            });
            return next.handle(httpProject);
        }

        return next.handle(req);
    }
}
