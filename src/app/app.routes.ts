import { Routes } from '@angular/router';
import { authGuard } from './core/auth/guards/auth.guard';

export const routes: Routes = [
  // Redirect root to dashboard or login
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },

  // Public routes (no authentication required)
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/public/login/login.component').then(
        (m) => m.LoginComponent
      ),
  },
  // Private routes (authentication required)
  {
    path: '',
    canActivateChild: [authGuard],
    loadChildren: () => [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/private/dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
        canActivate: [authGuard],
      },
    ],
  },

  // TODO: Create these components
  // {
  //   path: 'register',
  //   loadComponent: () => import('./pages/public/register/register.component').then(m => m.RegisterComponent)
  // },

  // Wildcard route - must be last
  {
    path: '**',
    redirectTo: '/login',
  },
];
