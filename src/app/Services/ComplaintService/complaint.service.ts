import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { CommunityResponse } from '../../Model/community.model';
import { BaseService } from '@services/BaseService/base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from '../../app.config';
import { GlobalErrorHandlerService } from '@services/ErrorHandlerService/error-handler.service';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ComplaintService {

  baseService = inject(BaseService)
  constructor(private http: HttpClient, private router: Router, private errorHandler: GlobalErrorHandlerService) { }
  private apiUrl = AppSettings.apiUrl; // Your backend API


  //Get all communities
  getVisitorList(): Observable<any> {
    return this.baseService.http.get<CommunityResponse>(`${this.baseService.apiUrl}/Visitor/GetAllVisitors`);
  }

  getComplaintByComplaintId(complainId: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Complaint/GetComplaintById/` + complainId);
  }

  updateComplaint(id: any, complaintModel: any): Observable<any> {
    const obj = JSON.stringify(complaintModel);
    return this.http.post<any>(`${this.apiUrl}/Complaint/UpdateComplaint?id=${id}`, complaintModel).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  saveComplaint(complaintModel: any): Observable<any> {
    const obj = JSON.stringify(complaintModel);
    return this.http.post<any>(`${this.apiUrl}/Complaint/CreateComplaint`, complaintModel).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }
}
