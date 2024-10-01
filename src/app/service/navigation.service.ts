import { Injectable } from '@angular/core';
import {APIConstant} from "../constant/APIConstant";
import {HttpClient} from "@angular/common/http";
import {ToastrService} from "ngx-toastr";
import {catchError, Observable, tap, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  url = APIConstant.NAV_PERMISSION_API;
  constructor(
    private http: HttpClient,
    private toastr: ToastrService
  ) { }

  getAllNavPermission(): Observable<any> {
    return this.http.get(`${this.url}/all`).pipe(
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
}
