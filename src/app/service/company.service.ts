import { Injectable } from '@angular/core';
import {APIConstant} from "../constant/APIConstant";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  url = APIConstant.COMPANY_API;

  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  checkIfCompanyExistsByCurrentUser(): Observable<any> {
    return this.http.get(`${this.url}/check-by-created`).pipe(
      tap((res: any) => {
        // this.toastr.success(res.message);
      }),
      catchError((err) => {
        if(err.error) {
          this.toastr.error(err.error.message);
        } else {
          this.toastr.error("Unauthorized");
        }
        return throwError(err);
      })
    );
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

  getAllCompanies(): Observable<any> {
    return this.http.get(`${this.url}/get-all-companies`).pipe(
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
