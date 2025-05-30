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
export class ResidentUploadService {
  baseService = inject(BaseService)
  constructor(private http: HttpClient, private router: Router, private errorHandler: GlobalErrorHandlerService) { }
  private apiUrl = AppSettings.apiUrl; // Your backend API


  //Get all Residents by Community
  getResidentUploadHistoryList(): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/ResidentUploadHistory/GetAllResidentsUploadHistory`);
  }

  UploadResidentExcel(formData: any): Observable<any> {
    return this.baseService.http.post<any>(`${this.baseService.apiUrl}/ResidentUploadHistory/UploadResidentExcel`, formData);
  }
  // DownloadFile(fileName: any): Observable<any> {
  //   return this.baseService.http.get<any>(`${this.baseService.apiUrl}/ResidentUploadHistory/DownloadFile?fileName=` + fileName);
  // }

  downloadFile(fileName: string): Observable<Blob> {
    return this.baseService.http.get(`${this.baseService.apiUrl}/ResidentUploadHistory/DownloadFile?fileName=${fileName}`, {
      responseType: 'blob'
    });
  }

  downloadTemplateFile(fileName: string): Observable<Blob> {
    return this.baseService.http.get(`${this.baseService.apiUrl}/ResidentUploadHistory/DownloadTemplate?fileName=${fileName}`, {
      responseType: 'blob'
    });
  }

  //Save Resident
  // saveResident(residentModel: any): Observable<any> {
  //   const obj = JSON.stringify(residentModel);
  //   return this.http.post<any>(`${this.apiUrl}/Resident/CreateResident`, residentModel).pipe(
  //     catchError((error: any) => {
  //       return throwError(() => error);
  //     })
  //   );
  // }

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

  // GetResidentsByResidentIdAsync(id: any): Observable<any> {
  //   return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Resident/GetResidentsByResidentId?residentId=` + id);
  // }

  // getResidentData(communityId: any): Observable<any> {
  //   return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Resident/GetAllResidentsByCommunityDropdown?communityId=` + communityId);
  // }

}

