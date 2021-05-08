import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { AccountService } from './account.service';

const API_URL = environment.apiUrl;
const CLIENT_ID = environment.clientId;

@Injectable({
  providedIn: "root",
})
export class AuthService {
  constructor(
    private accountService: AccountService,
    private http: HttpClient
  ) {}

  login(username: string, password: string) {
    const params = new HttpParams()
      .set("username", username)
      .set("password", password)
      .set("client_id", CLIENT_ID)
      .set("client_secret", "dummy")
      .set("grant_type", "password");
    const reqHeaders = new HttpHeaders().set(
      "Content-Type",
      "application/x-www-form-urlencoded"
    );

    const tokenUrl = environment.useAmbassador
      ? "/oauth/tokenv2"
      : "/oauth/token";

    return this.http
      .post<any>(API_URL + tokenUrl, params, {
        headers: reqHeaders,
      })
      .pipe(
        switchMap((loginData) => {
          sessionStorage.setItem(
            "access_token",
            loginData["access_token"].toString()
          );
          sessionStorage.setItem(
            "refresh_token",
            loginData["refresh_token"].toString()
          );

          // add account to session
          const accountObserv = this.accountService.getCurrentAccount().pipe(
            map((account) => {
              sessionStorage.setItem("account", JSON.stringify(account));
            }),
            catchError((err) => {
              throw err;
            })
          );

          // set user
          const userObserv = this.accountService.getCurrentUser().pipe(
            map((user) => {
              sessionStorage.setItem("user", JSON.stringify(user));
            }),
            catchError((err) => {
              throw err;
            })
          );
          return forkJoin([accountObserv, userObserv]);
        }),
        catchError((err) => {
          throw err;
        })
      );
  }
}
