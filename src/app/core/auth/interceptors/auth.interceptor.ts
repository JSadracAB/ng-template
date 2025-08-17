import { environment } from '@/environments/environment';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@app/core/auth/auth.service';
import { Observable, catchError, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  // Add access token to requests
  const authToken = authService.authToken;
  if (authToken) {
    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  }

  req = req.clone({
    setHeaders: {
      'x-api-key': environment.apiKey, // Ensure apiKey is set if needed
    },
  });

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      // If 401 and we have a refresh token, try to refresh
      if (
        error.status === 401 &&
        authService.refreshToken &&
        !req.url.includes('/refresh')
      ) {
        return handleTokenRefresh(authService, req, next);
      }

      return throwError(() => error);
    })
  );
};

function handleTokenRefresh(
  authService: AuthService,
  req: HttpRequest<unknown>,
  next: any
): Observable<HttpEvent<unknown>> {
  // Try to refresh token
  authService.refreshAccessToken();

  // Retry the original request with new token
  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.authToken}`,
      },
    })
  ).pipe(
    catchError((retryError: HttpErrorResponse) => {
      // If retry also fails, logout user
      if (retryError.status === 401) {
        authService.logout();
      }
      return throwError(() => retryError);
    })
  );
}
