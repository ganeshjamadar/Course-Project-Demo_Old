import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  tap, finalize } from 'rxjs/operators';

export class LoggingInterceptor implements HttpInterceptor
{
    intercept(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>>
    {
        return next.handle(req).pipe(
            tap(
                (event: HttpEvent<any>) =>
                {
                    status = '';
                    if (event instanceof HttpResponse) {
                      status = 'succeeded';
                    }
                  },
                  error => status = 'failed'
                ),
                finalize(
                () =>
                {
                    console.log('Logging interceptor' , event);
                })
        )
    }
}