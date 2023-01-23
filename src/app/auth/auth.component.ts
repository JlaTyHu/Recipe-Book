import { Component, OnDestroy, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Observable, Subscription } from "rxjs";
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";

import { AuthResponseData, AuthService } from "./auth.service";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnDestroy {
  @ViewChild('authForm') authForm: NgForm;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(private authService: AuthService,
              private router: Router,
              private dialog: MatDialog) {}

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
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      });

    this.authForm.reset();
  }

  onHandleError() {
    this.error = null;
  }

  private showErrorAlert(message: string) {
    this.dialog.open(AlertComponent, {
      data: {
        errorTitle: 'Error dialog message',
        errorMessage: message
      }
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
