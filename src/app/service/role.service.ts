import { Injectable } from '@angular/core';
import {APIConstant} from "../constant/APIConstant";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  url = APIConstant.ROLE_API;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getAllRoles() :Observable<any> {
    return this.http.get(`${this.url}/all`).pipe(
      tap((res: any) => {
        // this.toastr.success(res.message);
      }),
      catchError((err) => {
        // this.toastr.error(err.error.message);
        return throwError(err);
      })
    );
  }

  getAllNavPermissionByRole() :Observable<any> {
    return this.http.get(`${this.url}/all-by-role`).pipe(
      tap((res: any) => {
        // this.toastr.success(res.message);
      }),
      catchError((err) => {
        // this.toastr.error(err.error.message);
        return throwError(err);
      })
    );
  }
}
