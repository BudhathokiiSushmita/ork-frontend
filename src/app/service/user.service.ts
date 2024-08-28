import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "/users";

  constructor(private http: HttpClient) { }

  authenticate(obj: any) : Observable<any> {
    this.http.post(`${Environment.baseUrl}${this.url}`, obj).subscribe({
      next : (res) => {
      }
    })
    return new Observable<any>();
  }
}
