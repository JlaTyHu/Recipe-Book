import {Component, ComponentRef, OnDestroy, ViewChild, ViewContainerRef} from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthResponseData, AuthService } from "./auth.service";
import {Observable, Subscription} from "rxjs";
import { Router } from "@angular/router";
import { AlertComponent } from "../shared/alert/alert.component";
import {PlaceholderDirective} from "../shared/placeholder/placeholder.directive";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'
})
export class AuthComponent implements OnDestroy {
  @ViewChild('authForm') authForm: NgForm;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private cmpRef: ComponentRef<AlertComponent>;
  private closeSub: Subscription;
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
    // const alertCmp = new AlertComponent(); won't work! We don't have created own component there!
    // const alertComponent = this.viewContainerRef.createComponent(AlertComponent);
    // const hostViewContainerRef = this.alertHost.viewContainerRef;
    // hostViewContainerRef.clear();
    //
    // hostViewContainerRef.createComponent(AlertComponent);

    this.alertHost.viewContainerRef.clear();
    this.cmpRef = this.alertHost.viewContainerRef.createComponent(AlertComponent);

    this.cmpRef.instance.message = message;
    this.closeSub = this.cmpRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      this.alertHost.viewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
