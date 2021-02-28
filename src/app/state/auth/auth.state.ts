import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { map } from "rxjs/operators";
import { AuthService } from "src/app/services/auth.service";
import { AuthStateProps } from "./auth-props.state";
import { Login, SetToken } from "./auth.action";

@State<AuthStateProps>({
  name: 'auth',
  defaults: {
    expires_at: null,
    guest_session_id: null
  }
})

@Injectable()
export class AuthState {
  constructor(private authService: AuthService) {

  }

  @Selector()
  static isLogged(ctx: AuthStateProps): boolean {
    return !!ctx.guest_session_id
  }

  @Selector()
  static token(ctx: AuthStateProps): string | null {
    return ctx.guest_session_id
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateProps>) {

    return this.authService.login().pipe(
      map(response => {
        const { guest_session_id, expires_at } = response
        localStorage.setItem('@token', guest_session_id)
        ctx.patchState({
          guest_session_id,
          expires_at
        })
      })
    )
  }


  @Action(SetToken)
  setToken(ctx: StateContext<AuthStateProps>, action: SetToken) {
      const state = ctx.getState()
      ctx.patchState({
        ...state,
        guest_session_id: action.payload
      })
  }
}

