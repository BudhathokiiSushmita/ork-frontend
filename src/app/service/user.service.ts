import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Environment} from "../../environment/environment";
import {ToastrService} from "ngx-toastr";
import {APIConstant} from "../constant/APIConstant";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = APIConstant.USER_API;

  constructor(private http: HttpClient,
              private toastr: ToastrService) { }

  authenticate(obj: any): Observable<any> {
    return this.http.post(`${Environment.baseUrl}${this.url}`, obj).pipe(
      tap((res: any) => {
        this.toastr.success(res.message);
      }),
      catchError((err) => {
        this.toastr.error(err.error.message);
        return throwError(err);
      })
    );
  }

  register(obj: any): Observable<any> {
    return this.http.post(`${Environment.baseUrl}${this.url}/register`, obj).pipe(
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
