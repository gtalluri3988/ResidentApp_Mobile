import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CommunityResponse } from '../../Model/community.model';
import { BaseService } from '@services/BaseService/base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from '../../app.config';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandlerService } from '@services/ErrorHandlerService/error-handler.service';
import { ApiErrorResponse } from '@model/error-response.model';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  baseService = inject(BaseService)
  constructor(private http: HttpClient, private router: Router, private errorHandler: GlobalErrorHandlerService) { }
  private apiUrl = AppSettings.apiUrl; // Your backend API


  //Get all communities
  getVisitorList(): Observable<any> {
    return this.baseService.http.get<CommunityResponse>(`${this.baseService.apiUrl}/Visitor/GetAllVisitors`);
  }

  getComplaintList(): Observable<any> {

    return this.baseService.http.get<CommunityResponse>(`${this.baseService.apiUrl}/Complaint/GetAllComplaints`);
  }

  getTotalMaintanenceFees(communityId: any, paymentTypeId: any): Observable<any> {
    return this.baseService.http.get<CommunityResponse>(`${this.baseService.apiUrl}/Payment/TotalMaintanenceAmountByCommunity?communityId=${communityId}&paymentTypeId=${paymentTypeId}`);
  }

  getVisitorListByCommunityId(communityId: any): Observable<any> {
    return this.baseService.http.get<CommunityResponse>(`${this.baseService.apiUrl}/Visitor/GetAllVisitorsByCommunityId?communityId=` + communityId);
  }

  getComplaintListByCommunity(communityId: any): Observable<any> {

    return this.baseService.http.get<CommunityResponse>(`${this.baseService.apiUrl}/Complaint/GetAllComplaintsByCommunity?communityId=${communityId}`);
  }
}
