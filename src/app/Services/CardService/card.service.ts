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
export class CardService {

  baseService = inject(BaseService)
  constructor(private http: HttpClient, private router: Router, private errorHandler: GlobalErrorHandlerService) { }
  private apiUrl = AppSettings.apiUrl; // Your backend API

  getCardList(): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Card/GetAllResidentCards`);
  }

  //Save community
  saveCard(contentModel: any): Observable<any> {
    const obj = JSON.stringify(contentModel);
    return this.http.post<ApiErrorResponse>(`${this.apiUrl}/Card/CreateCard`, contentModel).pipe(
      catchError((error: ApiErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  updateCard(id: any, contentModel: any): Observable<any> {
    const obj = JSON.stringify(contentModel);
    return this.http.post<ApiErrorResponse>(`${this.apiUrl}/Card/UpdateCard/${id}`, contentModel).pipe(
      catchError((error: ApiErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  getCardById(id: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Card/GetCardById?id=` + id);
  }

  getCommunityList(): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Community/GetAllCommunitiesWithStates`);
  }

  getResidentDetailsByNRICandCommunity(nric: string, communityId: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Resident/GetResidentByNric?nric=${nric}&communityId=${communityId}`);
  }



}
