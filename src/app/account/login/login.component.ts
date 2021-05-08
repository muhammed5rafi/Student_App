import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/service/account.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  invalidlogin: boolean;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}
  login(loginForm: NgForm) {
    this.toastr.success("Hello world!", "Toastr fun!");
    const credentials = {
      username: loginForm.value.username,
      password: loginForm.value.password,
    };
    console.log(credentials);

    this.accountService.login(credentials);
  }
}
