import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';
import { AccountService } from 'src/app/service/account.service';
import { AuthService } from 'src/app/service/Auth.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  invalidlogin: boolean;
  loginForm: FormGroup;
  loading = false;

  constructor(
    private router: Router,
    private accountService: AccountService,
    private authService: AuthService,

    private toastr: ToastrService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", Validators.required),
      userpassword: new FormControl("", Validators.required),
    });
    console.log(this.loginForm);
  }
  get f() {
    return this.loginForm.controls;
  }
  loginSubmit() {
    if (this.loginForm.invalid) {
      this.toastr.error("Please ensure all fields are filled in.");
      return;
    }

    this.loading = true;

    this.getAccountAndDoLogin();
  }
  private getAccountAndDoLogin() {
    this.accountService.checkAccount(this.f.accountname.value.trim()).subscribe(
      (data) => {
        this.doLogin(data.id);
      },
      (error) => {
        this.handleLoginError(error);
      }
    );
  }
  private doLogin(account_id: string) {
    this.authService
      .login(
        account_id + ":" + this.f.username.value.trim(),
        this.f.userpassword.value
      )
      .pipe(first())
      .subscribe(
        (data) => {
          this.redirectToDashboard();
        },
        (error) => {
          this.handleLoginError(error);
        }
      );
  }

  private handleLoginError(error: any) {
    switch (error.status) {
      case 401: {
        this.toastr.error(
          "Your login details are incorrect",
          "Error logging in"
        );
        this.loading = false;
        break;
      }
      default: {
        console.log(`Login error. ${error.toString()}`);
        this.toastr.error(
          "There was a problem on the server. Please try again.",
          "Error logging in"
        );
        this.loading = false;
        break;
      }
    }
  }

  private redirectToDashboard() {
    this.accountService.getCurrentAccount().subscribe((res: Account) => {
      window.location.replace("dashboard");

      // if (res.is_admin) {
      //   window.location.replace('shipments/admin');
      // }
      //   else{
      //   }
    });
  }
}
