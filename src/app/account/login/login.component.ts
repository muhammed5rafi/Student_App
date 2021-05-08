import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  invalidlogin: boolean;

  constructor(private router: Router, private accountService: AccountService) {}

  ngOnInit() {}
  login(loginForm: NgForm) {
    console.log(loginForm);
    const credentials = {
      username: loginForm.value.username,
      password: loginForm.value.password,
    };

    this.accountService.login(credentials);
  }
}
