import { inject, Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
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
export class ContentService {

  baseService = inject(BaseService)
  constructor(private http: HttpClient, private router: Router, private errorHandler: GlobalErrorHandlerService) { }
  private apiUrl = AppSettings.apiUrl; // Your backend API

  getContentList(): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Content/GetAllContent`);
  }

  //Save community
  saveContent(contentModel: any): Observable<any> {
    const obj = JSON.stringify(contentModel);
    return this.http.post<ApiErrorResponse>(`${this.apiUrl}/Content/CreateContent`, contentModel).pipe(
      catchError((error: ApiErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  updateContent(id: any, contentModel: any): Observable<any> {
    const obj = JSON.stringify(contentModel);
    return this.http.post<ApiErrorResponse>(`${this.apiUrl}/Content/UpdateContent/${id}`, contentModel).pipe(
      catchError((error: ApiErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  getContentById(id: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Content/GetContentById/` + id);
  }

  getCommunityList(): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Community/GetAllCommunitiesWithStates`);
  }

  getCommunityById(id: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Community/GetCommunityById/` + id);
  }

  GetContentByContentIdAsync(id: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Content/GetContentById?id=` + id);
  }

}
