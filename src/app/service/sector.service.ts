import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {APIConstant} from "../constant/APIConstant";

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  url = APIConstant.SECTOR_API;

  constructor(private http: HttpClient,
              private toastr: ToastrService) { }

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
}
