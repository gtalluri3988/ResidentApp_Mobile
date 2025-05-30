import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseService } from '@services/BaseService/base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from '../../app.config';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandlerService } from '@services/ErrorHandlerService/error-handler.service';
import { ResidentModel } from '@model/resident-list.model';


@Injectable({
  providedIn: 'root'
})
export class AccessHistoryService {
  baseService = inject(BaseService)
  constructor(private http: HttpClient, private router: Router, private errorHandler: GlobalErrorHandlerService) { }
  private apiUrl = AppSettings.apiUrl; // Your backend API


  //Get all Residents by Community
  getResidentAccessHistoryList(communityId: string): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/ResidentAccessHistory/GetAllResidentsAccessHistory?communityId=` + communityId);
  }


  //Save Resident
  saveResidentAccessHistory(residentModel: any): Observable<any> {
    const obj = JSON.stringify(residentModel);
    return this.http.post<any>(`${this.apiUrl}/ResidentAccessHistory/CreateResidentAccessHistory`, residentModel).pipe(
      catchError((error: any) => {
        return throwError(() => error);
      })
    );
  }

  // updateResident(id: any, residentModel: any): Observable<any> {
  //   const obj = JSON.stringify(residentModel);
  //   return this.http.post<any>(`${this.apiUrl}/Resident/UpdateResident?id=${id}`, residentModel).pipe(
  //     catchError((error: any) => {
  //       return throwError(() => error);
  //     })
  //   );
  // }

  // getCommunityById(id: any): Observable<any> {
  //   return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Community/GetCommunityById/` + id);
  // }

  // getAllCommunitiesWithResidentCount(): Observable<any> {
  //   return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Community/GetAllCommunitiesWithResidentCount`);
  // }

  GetResidentsAccessByIdAsync(id: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/ResidentAccessHistory/GetResidentsAccessHistoryById?AccessId=` + id);
  }

  // getResidentData(communityId: any): Observable<any> {
  //   return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Resident/GetAllResidentsByCommunityDropdown?communityId=` + communityId);
  // }

}

