import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
}

export function authReducer(
  state = initialState,
  action: AuthActions.AuthUnion
) {
  switch (action.type) {
    case AuthActions.AuthActions.AuthenticateSuccess:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user: user,
        loading: false
      };
    case AuthActions.AuthActions.LoginStart:
    case AuthActions.AuthActions.SignupStart:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.AuthActions.AuthenticateFail:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      };
    case AuthActions.AuthActions.ClearError:
      return {
        ...state,
        authError: null
      };
    case AuthActions.AuthActions.Logout:
      return {
        ...state,
        user: null
      }
    default:
      return state;
  }
}
