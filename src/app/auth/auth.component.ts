import { Component, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
  @ViewChild('authForm') authForm: NgForm;
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService,
              private router: Router) {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    let authObs: Observable<AuthResponseData>

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      resData => {
        this.isLoading = false;
        console.log(resData);
        this.router.navigate(['/recipes'])
      }, errorMessage => {
        this.isLoading = false;
        this.error = errorMessage;
        console.log(errorMessage);
      });

    this.authForm.reset();
  }
}
