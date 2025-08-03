import { inject } from '@angular/core';
import { CanActivateChildFn, Router } from '@angular/router';
import { AuthService } from '../auth.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  // Check if user is authenticated
  // If not authenticated, redirect to login
  if (!authService.isAuthenticated()) {
    // If not authenticated, save the attempted URL so we can redirect after login
    const returnUrl = state.url;

    // Redirect to login with return url
    router.navigate(['/login'], {
      queryParams: { returnUrl },
    });

    return false;
  }
  // If authenticated, allow access to child routes
  return true;
};
