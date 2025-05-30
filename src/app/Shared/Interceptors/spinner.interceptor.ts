import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { SpinnerService } from '@services/SpinnerService/spinner.service';


import { finalize } from 'rxjs';

export const spinnerInterceptor: HttpInterceptorFn = (req, next) => {
  const spinnerService = inject(SpinnerService) as SpinnerService; // Explicitly set type
  spinnerService.show();

  return next(req).pipe(finalize(() => spinnerService.hide())); // Hide spinner on response
};