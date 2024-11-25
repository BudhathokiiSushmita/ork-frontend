import { Injectable } from '@angular/core';
import {APIConstant} from "../constant/APIConstant";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  url = APIConstant.GENERAL_API;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getVacancies(): Observable<any> {
    return this.http.get(`${this.url}/get-vacancies`).pipe(
      tap((res: any) => {
        // this.toastr.success(res.message);
      }),
      catchError((err) => {
        this.toastr.error(err.error.message);
        return throwError(err);
      })
    );
  }

  getBooleans(): Observable<any> {
    return this.http.get(`${this.url}/get-booleans`).pipe(
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
