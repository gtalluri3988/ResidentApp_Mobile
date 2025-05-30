
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
export class EventService {

  baseService = inject(BaseService)
  constructor(private http: HttpClient, private router: Router, private errorHandler: GlobalErrorHandlerService) { }
  private apiUrl = AppSettings.apiUrl; // Your backend API



  //Save community
  saveEvent(visitorModel: VisitorModel): Observable<any> {
    const obj = JSON.stringify(visitorModel);

    return this.http.post<ApiErrorResponse>(`${this.apiUrl}/Event/CreateEvent`, visitorModel).pipe(
      catchError((error: ApiErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  updateEvent(id: any, visitorModel: VisitorModel): Observable<any> {
    const obj = JSON.stringify(visitorModel);
    return this.http.post<ApiErrorResponse>(`${this.apiUrl}/Event/UpdateEvent/${id}`, visitorModel).pipe(
      catchError((error: ApiErrorResponse) => {
        return throwError(() => error);
      })
    );
  }



  getEventById(id: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Event/GetEventById?id=` + id);
  }




}
