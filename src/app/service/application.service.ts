import { Injectable } from '@angular/core';
import {APIConstant} from "../constant/APIConstant";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {

  url = APIConstant.APPLICATION_API;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) {
  }

  save(obj: any): Observable<any> {
    return this.http.post(`${this.url}`, obj).pipe(
      tap((res: any) => {
        this.toastr.success(res.message);
      }),
      catchError((err) => {
        this.toastr.error(err.error.message);
        return throwError(err);
      })
    );
  }

  getAll(showToast: Boolean): Observable<any> {
    return this.http.get(`${this.url}/list`).pipe(
      tap((res: any) => {
        if(showToast) {
          // this.toastr.success(res.message);
        }
      }),
      catchError((err) => {
        this.toastr.error(err.error.message);
        return throwError(err);
      })
    );
  }

  action(applicationId: any, action: any): Observable<any> {
    // return this.http.post(`${this.url}?applicationId=${applicationId}&action=${action}`).pipe(
    const data = {
      applicationId: applicationId,
      action: action
    }
    return this.http.post(`${this.url}/action`, data).pipe(
      tap((res: any) => {
        this.toastr.success(res.message);
      }),
      catchError((err) => {
        this.toastr.error(err.error.message);
        return throwError(err);
      })
    );
  }
}
