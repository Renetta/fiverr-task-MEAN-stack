import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../model/user.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token!: string;
  public currentUserSubject!: BehaviorSubject<any>;
  public currentUser!: Observable<User>;

  API_USER = "http://localhost:3000/api/user/";

  constructor(private http: HttpClient, private router: Router) {
    this.currentUserSubject = new BehaviorSubject(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  getToken() {
    return this.token;
  }

  public get currentUserValue(): User {
    console.log(this.currentUserSubject);
    return this.currentUserSubject.value;
  }

  createUser(userdata: User) {
    return this.http.post(this.API_USER + 'signup',userdata)
    .pipe(map((userObject) => {
      return userObject;
    }))
  }

  login(logindata: any) {
    return this.http.post<{token:string, currentUser: User}>(this.API_USER + 'login', logindata)
    .pipe(map((userdata) => {
      console.log(userdata);
      const token = userdata.token;
      this.token = token;
      localStorage.setItem('currentUser', JSON.stringify(userdata.currentUser));
      this.currentUserSubject.next(userdata.currentUser);
      return userdata;
    }));
  }

  logout() {
    console.log(localStorage);
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    this.router.navigate(['/application/login',{ relativeTo: '/sign-in'}]);
  }
}
