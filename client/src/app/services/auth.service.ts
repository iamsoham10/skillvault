import {inject, Injectable, signal} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, tap} from 'rxjs';
import {environment} from '../../environments/environment';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private LOGIN_URL = environment.LOGIN_API;
  private SIGNUP_URL = environment.SIGNUP_API;
  private OTP_URL = environment.OTP_API;
  accessToken = signal<string | null>(null); // signal for storing access token

  login(credentials: {email: string, password: string}): Observable<Object>{
    return this.http.post<{data: {tokens: {accessToken: string}}}>(this.LOGIN_URL, credentials, {withCredentials: true}).pipe(
      tap(response => {
        this.accessToken.set(response.data.tokens.accessToken);
        console.log(this.accessToken())
      })
    );
  }

  logOut(){
    this.accessToken.set(null);
    this.router.navigate(['']);
  }

  signUp(credentials: {username: string, email: string, password: string}): Observable<Object>{
    return this.http.post(this.SIGNUP_URL, credentials);
  }

  otp(credentials: {email: string, otp: string}): Observable<Object>{
    return this.http.post(this.OTP_URL, credentials);
  }

  getAccessToken(): Observable<Object>{
    return this.http.post<{newAccessToken: {accessToken: string}}>(environment.NEW_ACCESS_TOKEN_API, {}, {withCredentials: true})
      .pipe(
        tap(response => {
          this.accessToken.set(response.newAccessToken.accessToken);
        })
      )
  }
}
