import { environment } from './../../environments/environment';
import { Observable, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import {  catchError, map } from 'rxjs/operators';

export interface AuthProps {
  success: boolean,
  expires_at: string,
  guest_session_id: string
}
@Injectable({providedIn: 'root'})
export class AuthService {

  constructor(private httpClient: HttpClient) {}

  login(): Observable<AuthProps> {
    const url = `${environment.url_base}authentication/guest_session/new?api_key=${environment.key}`
    return this.httpClient.get(url).pipe(
      map((res: AuthProps) => res),
      catchError((x: any) => throwError(x))
    )
  }
}
