import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

export interface ApiRequestOptions {
  headers?: HttpHeaders | { [header: string]: string | string[] };
  params?:
    | HttpParams
    | {
        [param: string]:
          | string
          | number
          | boolean
          | ReadonlyArray<string | number | boolean>;
      };
  observe?: 'body';
  responseType?: 'json';
}

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly http = inject(HttpClient);

  // Signal to manage the API base URL with default value from environment
  private readonly apiUrl = signal<string>(environment.apiUrl || '');

  /**
   * Sets the base URL for all API calls
   * If this method is not called, the URL configured in environment.apiUrl will be used
   * @param url - API base URL
   */
  setApiUrl(url: string): void {
    this.apiUrl.set(url.endsWith('/') ? url.slice(0, -1) : url);
  }

  /**
   * Gets the current API base URL
   * @returns API base URL (default from environment.apiUrl)
   */
  getApiUrl(): string {
    return this.apiUrl();
  }

  /**
   * Builds the complete URL by concatenating the base with the endpoint
   * @param endpoint - Specific endpoint
   * @returns Complete URL
   */
  private buildUrl(endpoint: string): string {
    const baseUrl = this.apiUrl();
    if (!baseUrl) {
      throw new Error(
        'API URL is not configured. Configure environment.apiUrl or use setApiUrl().'
      );
    }

    const cleanEndpoint = endpoint.startsWith('/')
      ? endpoint.slice(1)
      : endpoint;
    return `${baseUrl}/${cleanEndpoint}`;
  }

  /**
   * Performs a GET request
   * @param endpoint - API endpoint
   * @param options - Additional options for the request
   * @returns Observable with the response
   */
  get<T>(endpoint: string, options?: ApiRequestOptions): Observable<T> {
    return this.http.get<T>(this.buildUrl(endpoint), options);
  }

  /**
   * Performs a POST request to create a new resource
   * @param endpoint - API endpoint
   * @param data - Data to send in the request body
   * @param options - Additional options for the request
   * @returns Observable with the response
   */
  create<T>(
    endpoint: string,
    data: any,
    options?: ApiRequestOptions
  ): Observable<T> {
    return this.http.post<T>(this.buildUrl(endpoint), data, options);
  }

  /**
   * Performs a PUT request to completely update a resource
   * @param endpoint - API endpoint
   * @param data - Data to send in the request body
   * @param options - Additional options for the request
   * @returns Observable with the response
   */
  put<T>(
    endpoint: string,
    data: any,
    options?: ApiRequestOptions
  ): Observable<T> {
    return this.http.put<T>(this.buildUrl(endpoint), data, options);
  }

  /**
   * Performs a PATCH request to partially update a resource
   * @param endpoint - API endpoint
   * @param data - Data to send in the request body
   * @param options - Additional options for the request
   * @returns Observable with the response
   */
  patch<T>(
    endpoint: string,
    data: any,
    options?: ApiRequestOptions
  ): Observable<T> {
    return this.http.patch<T>(this.buildUrl(endpoint), data, options);
  }

  /**
   * Performs a DELETE request to remove a resource
   * @param endpoint - API endpoint
   * @param options - Additional options for the request
   * @returns Observable with the response
   */
  delete<T>(endpoint: string, options?: ApiRequestOptions): Observable<T> {
    return this.http.delete<T>(this.buildUrl(endpoint), options);
  }
}
