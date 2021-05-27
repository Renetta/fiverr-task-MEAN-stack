import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;
  API_USER = "http://localhost:3000/api/user/";
  constructor(private http: HttpClient) { }

  getToken() {
    return this.token;
  }

  createUser(userdata: User) {
    return this.http.post(this.API_USER + 'signup',userdata)
    .pipe(map((userObject) => {
      return userObject;
    }))
  }

  login(logindata: any) {
    return this.http.post<{token:string}>(this.API_USER + 'login', logindata)
    .pipe(map((userdata) => {
      const token = userdata.token;
      this.token = token;
      return userdata;
    }));
  }
}
