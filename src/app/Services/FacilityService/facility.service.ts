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
export class FacilityService {

  baseService = inject(BaseService)
  constructor(private http: HttpClient, private router: Router, private errorHandler: GlobalErrorHandlerService) { }
  private apiUrl = AppSettings.apiUrl; // Your backend API

  getFacilityList(): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Facility/GetAllFacility`);
  }
  searchFacilityList(communityId: any, facilityTypeId: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Facility/SearchFacility?communityId=` + communityId + '&facilityTypeId=' + facilityTypeId);
  }

  //Save community
  saveFacility(facilityModel: any): Observable<any> {
    const obj = JSON.stringify(facilityModel);
    return this.http.post<ApiErrorResponse>(`${this.apiUrl}/Facility/CreateFacility`, facilityModel).pipe(
      catchError((error: ApiErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  updatefacility(id: any, facilityModel: any): Observable<any> {
    const obj = JSON.stringify(facilityModel);
    return this.http.post<ApiErrorResponse>(`${this.apiUrl}/Facility/UpdateFacility/${id}`, facilityModel).pipe(
      catchError((error: ApiErrorResponse) => {
        return throwError(() => error);
      })
    );
  }

  getfacilityById(id: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Facility/GetCommunityById/` + id);
  }

  getCommunityList(): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Community/GetAllCommunitiesWithStates`);
  }

  getCommunityById(id: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Community/GetCommunityById/` + id);
  }

  GetfacilityByFacilityIdAsync(id: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Facility/GetFacilityById?id=` + id);
  }

  GetfacilityListByCommunityIdAsync(id: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Facility/GetAllFacilitiesByCommunityId?communityId=` + id);
  }

  GetAllFacilitiesByfacilityTypeIdAsync(id: any, facilityId: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/Facility/GetAllFacilitiesByfacilityType?communityId=` + id + `&facilityTypeId=` + facilityId);
  }

  saveFacilityBooking(facilityModel: any): Observable<any> {
    const obj = JSON.stringify(facilityModel);
    return this.http.post<ApiErrorResponse>(`${this.apiUrl}/ResidentFacilityBooking/CreateResidentFacilityBooking`, facilityModel).pipe(
      catchError((error: ApiErrorResponse) => {
        return throwError(() => error);
      })
    );
  }


  GetfacilityBookingByFacilityIdAsync(id: any, resid: any): Observable<any> {
    return this.baseService.http.get<any>(`${this.baseService.apiUrl}/ResidentFacilityBooking/GetResidentFacilityBookingByFacilityId?facilityId=` + id + `&residentId=` + resid);
  }

}
