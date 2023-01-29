import { Action } from "@ngrx/store";

export enum AuthActions {
  LoginStart = '[Auth] Login Start',
  AuthenticateSuccess = '[Auth] Login',
  AuthenticateFail = '[Auth] Login Fail',
  SignupStart = '[Auth] Signup Start',
  ClearError = '[Auth] Clear Error',
  AutoLogin = '[Auth] Auto Login',
  AutoLogout = '[Auth] Auto Logout',
  Logout = '[Auth] Logout'
}

export class AuthenticateSuccess implements Action {
  readonly type = AuthActions.AuthenticateSuccess;

  constructor(
    public payload: {
      email: string;
      userId: string;
      token: string;
      expirationDate: Date;
      redirect: boolean;
    }
  ) {}
}

export class LoginStart implements Action {
  readonly type = AuthActions.LoginStart;

  constructor(public payload: { email: string; password: string; }) {}
}

export class AuthenticateFail implements Action {
  readonly type = AuthActions.AuthenticateFail;

  constructor(public payload: string) {}
}

export class SignupStart implements Action {
  readonly type = AuthActions.SignupStart;

  constructor(public payload: { email: string; password: string; }) {}
}

export class ClearError implements Action {
  readonly type = AuthActions.ClearError;
}

export class AutoLogin implements Action {
  readonly type = AuthActions.AutoLogin
}

export class AutoLogout implements Action {
  readonly type = AuthActions.AutoLogout
}

export class Logout implements Action {
  readonly type = AuthActions.Logout;
}

export type AuthUnion =
  | AuthenticateSuccess
  | LoginStart
  | AuthenticateFail
  | SignupStart
  | ClearError
  | AutoLogin
  | AutoLogout
  | Logout;
