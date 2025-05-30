import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CommunityResponse } from '../../Model/community.model';
import { BaseService } from '@services/BaseService/base.service';
import { CommunityModel } from '@model/community-detail.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from '../../app.config';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandlerService } from '@services/ErrorHandlerService/error-handler.service';
import { ApiErrorResponse } from '@model/error-response.model';
import { UserModel } from '@model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseService = inject(BaseService)
  constructor(private http: HttpClient, private router: Router, private errorHandler: GlobalErrorHandlerService) { }
  private apiUrl = AppSettings.apiUrl; // Your backend API

  //Get all communities
  getUserList(): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/User/GetAllUsers`);
  }

  //Save community
  saveUser(userModel: UserModel): Observable<any> {
    const obj = JSON.stringify(userModel);
    return this.http.post<any>(`${this.apiUrl}/User/CreateUser`, userModel).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  updateUser(id: any, userModel: UserModel): Observable<any> {
    const obj = JSON.stringify(userModel);
    return this.http.put<any>(`${this.apiUrl}/User/UpdateUser/${id}`, userModel).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  getUserById(id: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/User/GetUserById?userId=` + id);
  }

  getCommunityList(): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Community/GetAllCommunitiesWithStates`);
  }

}
