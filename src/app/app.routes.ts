import { Routes } from '@angular/router';

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

  // TODO: Create these components
  // {
  //   path: 'register',
  //   loadComponent: () => import('./pages/public/register/register.component').then(m => m.RegisterComponent)
  // },

  // TODO: Create these components
  // {
  //   path: 'dashboard',
  //   loadComponent: () => import('./pages/private/dashboard/dashboard.component').then(m => m.DashboardComponent),
  //   canActivate: [authGuard]
  // },

  // Wildcard route - must be last
  {
    path: '**',
    redirectTo: '/login',
  },
];
