import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";

import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";

import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceholderDirective } from "../shared/placeholder/placeholder.directive";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions'

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('authForm') authForm: NgForm;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  private storeSub: Subscription;
  isLoginMode = true;
  isLoading = false;
  error = null;

  constructor(
    private dialog: MatDialog,
    private store: Store<fromApp.AppState>
    ) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.authForm.valid) {
      return;
    }

    const email = this.authForm.value.email;
    const password = this.authForm.value.password;

    if (this.isLoginMode) {
      this.store.dispatch(new AuthActions.LoginStart({
        email: email,
        password: password
      }));
    } else {
      this.store.dispatch(
        new AuthActions.SignupStart({
          email: email,
          password: password
        })
      );
    }
    this.authForm.reset();
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
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
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
