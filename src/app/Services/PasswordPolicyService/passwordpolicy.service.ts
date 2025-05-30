import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseService } from '@services/BaseService/base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from '../../app.config';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandlerService } from '@services/ErrorHandlerService/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class PasswordpolicyService {

  baseService = inject(BaseService)
  constructor(private http: HttpClient, private router: Router, private errorHandler: GlobalErrorHandlerService) { }
  private apiUrl = AppSettings.apiUrl; // Your backend API



  getPasswordPolicy(): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Admin/GetAllPasswordPolicyDetails`);
  }

  savePasswordPolicy(policy: any): Observable<any> {
    debugger;
    const obj = JSON.stringify(policy);
    return this.baseService.http.post<any>(`${this.baseService.apiUrl}/Admin/UpdatePasswordPolicy`, policy);
  }

}
