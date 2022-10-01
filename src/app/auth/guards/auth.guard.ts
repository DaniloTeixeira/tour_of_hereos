import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate(): boolean {
    this.authService.setIsLoggedIn();

    const hasToken = !!localStorage.getItem('token');

    if (!hasToken) {
      this.router.navigate(['/login']);
    }

    return hasToken;
  }
}
