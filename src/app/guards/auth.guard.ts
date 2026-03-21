import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateChildFn = (childRoute, state) => {

  const router = inject(Router);

  const token = localStorage.getItem('token');
  const admin = localStorage.getItem('admin');

  // ✅ Autorisé
  if (token && admin) {
    return true;
  }

  // ❌ Refus → redirection login
  router.navigate(['/login']);
  return false;
};