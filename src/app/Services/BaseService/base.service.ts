import { inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';
import { tap } from 'rxjs/operators';
import { APIResponseModel } from '../../Model/apiresponse.model';
import { AppSettings } from '../../app.config';
import { CommunityResponse } from '../../Model/community.model';

@Injectable({
  providedIn: 'root'
})
export class BaseService {
  data: any[] = [];
  communityTypeDropDown: any[] = [];
  stateDropDown: any[] = [];
  roleDropDown: any[] = [];
  chargeTypeDropDown: any[] = [];
  statusDropDown: any[] = [];
  cityDropDown: any[] = [];
  facilityTypeDropDown: any[] = [];
  complaintTypeDropDown: any[] = [];
  visitorTypeDropDown: any[] = [];
  complaintStatusDropDown: any[] = [];
  menuDropDown: any[] = [];
  subMenuDropDown: any[] = [];
  paymentTypeDropDown: any[] = [];
  paymentStatusDropDown: any[] = [];
  http = inject(HttpClient);
  router = inject(Router);
  apiUrl = AppSettings.apiUrl; // Your backend API


  getCommunityTypeList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Community/GetCommunityTypes`);
  }
  getStateList(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Community/GetCommunityTypes`);
  }

  getDropDownTypeList(Type: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SelectList/GetSelectList?inputType=` + Type);
  }

  getSubMenuList(subMenuId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Admin/GetSubMenuListByMenuId?subMenuId=` + subMenuId);
  }

  getCityListByState(stateId: any): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Community/GetCityByStateId?stateId=` + stateId);
  }


  public handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unexpected error occurred';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = error.error || error.statusText;
    }
    return throwError(() => new Error(errorMessage));
  }

}