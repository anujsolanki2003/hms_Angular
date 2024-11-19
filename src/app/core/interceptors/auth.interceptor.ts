import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { catchError, switchMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const accessToken = this.authService.getAccessToken();

    if (accessToken) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('HTTP Error occurred:', error);

        if (error.status === 401) {
          return this.authService.refreshAccessToken().pipe(
            switchMap((newAccessToken: string) => {
              if (newAccessToken) {
                request = request.clone({
                  setHeaders: {
                    Authorization: `Bearer ${newAccessToken}`,
                  },
                });
                return next.handle(request);
              } else {
                this.authService.logout();
                return throwError(() => new Error('Unauthorized'));
              }
            }),
            catchError((refreshError) => {
              console.error('Token refresh failed:', refreshError);

              this.authService.logout();
              return throwError(() => new Error('Unauthorized'));
            })
          );
        }
        return throwError(() => error);
      })
    );
  }
}
