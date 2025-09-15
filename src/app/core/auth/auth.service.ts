import { decodeJwtToken } from '@/app/shared/utils/jwt.utils';
import { environment } from '@/environments/environment';
import { inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api/api.service';
import { LoginFormValues } from './components/login-form/login.form';
import { RegistrationFormValues } from './components/registration-form/registration.form';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // services
  private readonly apiService = inject(ApiService);
  private readonly router = inject(Router);

  // constants
  private readonly apiUrl = environment.apiUrl; // Adjust the API URL as needed

  // variables
  private currentUser = signal<any | null | undefined>(undefined); // Not loaded yet (replace 'any' with User type when available)

  constructor() {}

  get authToken(): string | null {
    return localStorage.getItem('access-token');
  }

  set authToken(token: string | null) {
    if (token) {
      localStorage.setItem('access-token', token);
    } else {
      localStorage.removeItem('access-token');
    }
  }

  get refreshToken(): string | null {
    return localStorage.getItem('refresh-token');
  }

  set refreshToken(token: string | null) {
    if (token) {
      localStorage.setItem('refresh-token', token);
    } else {
      localStorage.removeItem('refresh-token');
    }
  }

  register(formValues: RegistrationFormValues): void {
    // Logic to perform user registration, e.g., make an HTTP request to the API
    this.apiService
      .post(`${this.apiUrl}/register`, formValues)
      .subscribe((response: any) => {
        // Handle successful registration, e.g., redirect to login or show a success message
        this.router.navigate(['/login']);
      });
  }

  login(formValues: LoginFormValues): void {
    this.apiService
      .post(`${this.apiUrl}/auth/login`, formValues)
      .subscribe((response: any) => {
        // Store both tokens
        const accessToken = response.data.token;
        this.authToken = accessToken;
        // this.refreshToken = response.refreshToken;
        const userData = decodeJwtToken(accessToken);
        this.currentUser.set(userData);

        console.log('User data:', userData);

        // Redirect to dashboard or home
        this.router.navigate(['/dashboard']);
      });
  }

  // Method to refresh access token
  refreshAccessToken(): void {
    if (!this.refreshToken) {
      this.logout();
      return;
    }

    this.apiService
      .post(`${this.apiUrl}/refresh`, { refreshToken: this.refreshToken })
      .subscribe({
        next: (response: any) => {
          this.authToken = response.accessToken;
          // Optionally update refresh token if backend provides a new one
          if (response.refreshToken) {
            this.refreshToken = response.refreshToken;
          }
        },
        error: () => {
          // Refresh token is invalid, force logout
          this.logout();
        },
      });
  }

  logout(): void {
    const refreshToken = this.refreshToken;

    // Clear tokens immediately
    this.clearUserData();

    // Optional: Notify backend to invalidate tokens
    if (refreshToken) {
      this.apiService
        .post(`${this.apiUrl}/logout`, { refreshToken })
        .subscribe({
          next: () => console.log('Logout successful'),
          error: () =>
            console.log(
              'Logout request failed, but user is logged out locally'
            ),
        });
    }

    // Redirect to login
    this.router.navigate(['/login']);
  }

  clearUserData(): void {
    // Clear both tokens and user data
    this.authToken = null;
    this.refreshToken = null;
    this.currentUser.set(null);
  }

  isAuthenticated(): boolean {
    // Logic to check if the user is authenticated
    return !!this.authToken; // Returns true if authToken exists, false otherwise
  }
}
