import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { LoginPayload } from '../models/LoginPayload';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _isLoggedIn$ = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this._isLoggedIn$.asObservable();

  login(payload: LoginPayload): Observable<string> {
    localStorage.setItem('token', JSON.stringify(payload));
    this.setIsLoggedIn();

    return of('Login efetuado com sucesso!');
  }

  logout(): Observable<string> {
    localStorage.removeItem('token');
    this.setIsLoggedIn();

    return of('Logout efetuado com sucesso!');
  }

  setIsLoggedIn(): void {
    const token = localStorage.getItem('token');

    if (token) {
      this._isLoggedIn$.next(true);
      return;
    }

    this._isLoggedIn$.next(false);
  }
}
