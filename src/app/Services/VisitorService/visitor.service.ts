import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { BaseService } from '@services/BaseService/base.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppSettings } from '../../app.config';
import { catchError } from 'rxjs/operators';
import { GlobalErrorHandlerService } from '@services/ErrorHandlerService/error-handler.service';
import { ApiErrorResponse } from '@model/error-response.model';
import { VisitorModel } from '@model/visitor.model';


@Injectable({
  providedIn: 'root'
})
export class VisitorService {

  baseService = inject(BaseService)
  constructor(private http: HttpClient, private router: Router, private errorHandler: GlobalErrorHandlerService) { }
  private apiUrl = AppSettings.apiUrl; // Your backend API



  //Save community
  saveVisitor(visitorModel: VisitorModel): Observable<any> {
    const obj = JSON.stringify(visitorModel);

    return this.http.post<ApiErrorResponse>(`${this.apiUrl}/Visitor/SaveVisitorMobile`, visitorModel).pipe(
      catchError((error: ApiErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  updateVisitor(id: any, visitorModel: VisitorModel): Observable<any> {
    const obj = JSON.stringify(visitorModel);
    return this.http.post<ApiErrorResponse>(`${this.apiUrl}/Visitor/UpdateCommunity/${id}`, visitorModel).pipe(
      catchError((error: ApiErrorResponse) => {
        return throwError(() => error);
      })
    );
  }



  getVisitorById(id: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Visitor/GetVisitorById/` + id);
  }

  getResidentData(communityId: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Resident/GetAllResidentsByCommunityDropdown?communityId=` + communityId);
  }

  getResidentDataByAddress(roadNo: any, blockNo: any, level: any, houseNo: any): Observable<any> {
    return this.baseService.http.get<any>
      (`${this.baseService.apiUrl}/Resident/GetResidentsNameandContactByAddresses?roadNo=` + roadNo + `&blockNo=` + blockNo + `&level=` + level + `&houseNo=` + houseNo);
  }
}
