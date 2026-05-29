import { inject } from '@angular/core';

import { CanActivateFn, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);

  const router = inject(Router);

  const token = localStorage.getItem('token');

  if (!token) {
    router.navigate(['/login']);

    return false;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expiracion = payload.exp * 1000;

    if (Date.now() > expiracion) {
      authService.logout();

      return false;
    }

    return true;
  } catch {
    authService.logout();

    return false;
  }
};
