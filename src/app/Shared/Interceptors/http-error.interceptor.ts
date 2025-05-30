import { HttpInterceptorFn } from '@angular/common/http';
import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const httpErrorInterceptor: HttpInterceptorFn = (req: HttpRequest<any>, next: HttpHandlerFn): Observable<HttpEvent<any>> => {

  const route = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'An unexpected error occurred.';

      if (error.status === 0) {
        errorMessage = 'Network issue. Check your connection.';
        route.navigate(['/login']);
      } else if (error.status === 401) {
        route.navigate(['/login']);
      } else if (error.status === 404) {
        errorMessage = 'Requested resource not found.';
      } else if (error.status === 500) {
        errorMessage = 'Internal server error. Try again later.';
      }
      else if (error.status === 400) {
        errorMessage = error.error;
      }

      console.error('HTTP Error:', errorMessage);
      return throwError(() => new Error(errorMessage)); // ✅ Properly throw error
    })
  );
};
