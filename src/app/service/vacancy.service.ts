import { Injectable } from '@angular/core';
import {APIConstant} from "../constant/APIConstant";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class VacancyService {

  url = APIConstant.VACANCY_API;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

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

  getAllVacancies(showToast: boolean): Observable<any> {
    return this.http.get(`${this.url}/get-all-vacancies`).pipe(
      tap((res: any) => {
        // this.toastr.success(res.message);
      }),
      catchError((err) => {
        this.toastr.error(err.error.message);
        return throwError(err);
      })
    );
  }

  getById(id: any): Observable<any> {
    return this.http.get(`${this.url}/${id}`).pipe(
      tap((res: any) => {
        // this.toastr.success(res.message);
      }),
      catchError((err) => {
        this.toastr.error(err.error.message);
        return throwError(err);
      })
    );
  }
}
