import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, tap, throwError} from "rxjs";
import {Environment} from "../../environment/environment";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "/users";

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
}
