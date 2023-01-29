import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

import { Actions, ofType, createEffect } from '@ngrx/effects';
import { catchError, map, of, switchMap, tap } from "rxjs";

import * as AuthActions from './auth.actions';
import { environment } from "../../../environments/environment";
import { AuthService } from "../auth.service";
import { User } from "../user.model";

export interface AuthResponseData {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

const handleAuthentication = (
  expiresIn: number,
  email: string,
  userId: string,
  token: string
) => {
  const expirationDate = new Date(
    new Date().getTime() + expiresIn * 1000
  );
  const user = new User(email, userId, token, expirationDate);
  localStorage.setItem('userData', JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: email,
    userId: userId,
    token: token,
    expirationDate: expirationDate,
    redirect: false
  });
};
const handleError = (errorRes: any) => {
  let errorMessage = 'An unknown error occurred!';
  if (!errorRes.error || !errorRes.error.error) {
    return of(new AuthActions.AuthenticateFail(errorMessage));
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errorMessage = 'This email exists already';
      break;
    case 'EMAIL_NOT_FOUND':
      errorMessage = 'This email does not exist.';
      break;
    case 'INVALID_PASSWORD':
      errorMessage = 'This password is not correct.';
      break;
  }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  authSignup$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AuthActions.SignupStart),
        switchMap((signupActions: AuthActions.SignupStart) => {
          return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
            {
              email: signupActions.payload.email,
              password: signupActions.payload.password,
              returnSecureToken: true
            }
          )
            .pipe(
              tap((resData) => {
                this.authService.setLogoutTimer(+resData.expiresIn * 1000);
              }),
              map(resData => {
                return handleAuthentication(
                  +resData.expiresIn,
                  resData.email,
                  resData.localId,
                  resData.idToken
                );
              }),
              catchError(errorRes => {
                return handleError(errorRes);
              })
            );
        })
      )
    }
  );

  authLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(AuthActions.AuthActions.LoginStart),
      switchMap((authData: AuthActions.LoginStart) => {
        return this.http
          .post<AuthResponseData>(
            'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=' +
            environment.firebaseAPIKey,
            {
              email: authData.payload.email,
              password: authData.payload.password,
              returnSecureToken: true
            }
          )
          .pipe(
            tap((resData) => {
              this.authService.setLogoutTimer(+resData.expiresIn * 1000);
            }),
            map(resData => {
              return handleAuthentication(
                +resData.expiresIn,
                resData.email,
                resData.localId,
                resData.idToken
              );
            }),
            catchError(errorRes => {
              return handleError(errorRes);
            })
          );
      })
    );
  });

  authRedirect$ = createEffect(
    () => this.actions$.pipe(
    ofType(AuthActions.AuthActions.AuthenticateSuccess),
    tap((authSuccessAction: AuthActions.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  ),
  { dispatch: false }
  );

  autoLogin$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AuthActions.AutoLogin),
        map(() => {
          const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
          } = JSON.parse(localStorage.getItem('userData'));
          if (!userData) {
            return { type: 'DUMMY' };
          }

          const loadedUser = new User(
            userData.email,
            userData.id,
            userData._token,
            new Date(userData._tokenExpirationDate)
          );

          if (loadedUser.token) {
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.authService.setLogoutTimer(expirationDuration);
            return new AuthActions.AuthenticateSuccess({
              email: loadedUser.email,
              userId: loadedUser.id,
              token: loadedUser.token,
              expirationDate: new Date(userData._tokenExpirationDate),
              redirect: false
            });
          }

          return { type: 'DUMMY' };
        })
      )
    }
  );

  autoLogout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(AuthActions.AuthActions.Logout),
        tap(() => {
          this.authService.clearLogoutTimer();
          localStorage.removeItem('userData');
          this.router.navigate(['/auth']);
        })
      )
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}
}
