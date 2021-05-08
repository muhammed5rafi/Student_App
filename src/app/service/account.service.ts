import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { AccountCheck } from '../model/account-check.model';

const API_URL = environment.apiUrl;

@Injectable({
  providedIn: "root",
})
export class AccountService {
  constructor(private http: HttpClient) {}
  checkAccount(accountname: string) {
    return this.http.get<AccountCheck>(
      API_URL + "/services/accounts/check/" + accountname
    );
  }

  getCurrentAccount(): Observable<Account> {
    return this.http.get<Account>(API_URL + "/account");
  }

  getCurrentUser() {
    return this.http.get(API_URL + "/users/me");
  }
}
