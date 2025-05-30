import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APIResponseModel } from '../../Model/apiresponse.model';
import { AppSettings } from '../../app.config';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandlerService } from '@services/ErrorHandlerService/error-handler.service';
import { CommunityModel } from '@model/community-detail.model';
import { jwtDecode } from 'jwt-decode';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = AppSettings.apiUrl; // Your backend API

  constructor(private http: HttpClient, private router: Router, private errorHandler: GlobalErrorHandlerService,
    private idle: Idle
  ) {

  }

  startIdleWatch() {
    this.idle.setIdle(900);
    this.idle.setTimeout(60);
    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onTimeout.subscribe(() => {
      this.logout();
    });

    this.idle.watch();
  }

  residentLogin(credentials: { Username: string; password: string; roleId: number }): Observable<any> {
    return this.http.post<APIResponseModel>(`${this.apiUrl}/Auth/ResidentAuthenticate`, credentials).pipe(
      catchError((error) => {
        return throwError(() => new Error(error.message)); // Optional: Re-throw error
      })
    );
  }

  reSetPassword(Username: string): Observable<any> {
    return this.http.get<APIResponseModel>(`${this.apiUrl}/Auth/ResetPassword?email=` + Username).pipe(
      catchError((error) => {

        return throwError(() => new Error(error.message)); // Optional: Re-throw error
      })
    );
  }

  decodeToken(): any {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }

  getUserRoles(): string {

    const decoded = this.decodeToken();
    return decoded?.role;
  }
  getUserRoleId(): string {

    const decoded = this.decodeToken();
    return decoded?.roleid;
  }

  getUserCommunity(): string {
    debugger;
    const decoded = this.decodeToken();
    return decoded?.CommunityId;
  }

  getUserId(): string {
    debugger;
    const decoded = this.decodeToken();
    return decoded?.userid;
  }

  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

}