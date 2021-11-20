import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, isDevMode } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IApiResponse } from '../models/api-response';
import { BaseModel } from '../models/base-model';
import { MavUtilsService } from './mav-utils.service';

@Injectable({
  providedIn: 'root'
})
export class MavDataService {

  baseURL = environment.baseUrl;

  constructor(
    private http: HttpClient,
    private utilsService: MavUtilsService,
  ) { }


  saveData<T extends BaseModel>(url: string, data: T, event?: LazyLoadEvent, customParams?: HttpParams, isMultiPartData: boolean = false): Observable<IApiResponse<T>> {
    let values: any = null;

    let params = new HttpParams();

    if (event) {
      params = this.utilsService.lazyLoadToCustomParams(event);
    }

    if (isMultiPartData) {
      //event data to formData işlemleri yapılacak
    } else {
      values = data;
    }

    if (isDevMode())
      console.log("Gönderilen veri", values);

    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    if (data.id) {
      return this.http.put<T>(`${this.baseURL}${url}`, values, { headers: headers, params: params }).pipe(map((response: any) => {
        console.log("Dönen veri", response);
        return response.body;
      }))
    } else {
      return this.http.post<IApiResponse<T>>(`${this.baseURL}${url}`, values, { headers: headers }).pipe(map((response: IApiResponse<T>) => {
        console.log("Dönen veri", response);
        return response;
      }))
    }
  }

  getById<T extends BaseModel>(url: string, id: string): Observable<IApiResponse<T>> {

    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IApiResponse<T>>(`${this.baseURL}${url}/${id}`, { headers }).pipe(
      map((response: IApiResponse<T>) => {
        return response;
      })
    );
  }

  getDataList<T extends BaseModel>(url: string, event?: LazyLoadEvent, customParams?: HttpParams): Observable<IApiResponse<T>> {
    let values: any = null;

    let params = new HttpParams();

    if (event) {
      params = this.utilsService.lazyLoadToCustomParams(event);
    }

    if (customParams) {
      for (const key in customParams) {
        console.log(key);
      }
    }

    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get<IApiResponse<T>>(`${this.baseURL}${url}`, { headers, params }).pipe(
      map((response: IApiResponse<T>) => {
        return response;
      })
    );
  }
}
