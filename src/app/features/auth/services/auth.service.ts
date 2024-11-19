import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from 'src/app/core/interfaces/user.data';
import { API_ENDPOINTS } from 'src/app/app.constants';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';
  private readonly USER_ROLE_KEY = 'userRole';
  private readonly USER_ID_KEY = 'userId';

  private isLoggedInSubject = new BehaviorSubject<boolean>(false);
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    const accessToken = this.getAccessToken();
    this.setLoggedIn(!!accessToken);
  }

  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ user: User; tokens: any }> {
    return this.http
      .post<{ user: User; tokens: any }>(API_ENDPOINTS.LOGIN, credentials)
      .pipe(
        tap((response) => {
          const { tokens, user } = response;
          console.log('Login response:', response);
          this.storeTokens(tokens.access.token, tokens.refresh.token);
          this.storeUserRole(user.role);
          this.storeUserId(user.id);
          this.setLoggedIn(true);
        }),
        catchError(this.handleError)
      );
  }

  public isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  refreshAccessToken(): Observable<string> {
    const refreshToken = this.getRefreshToken();
    console.log(
      'Attempting to refresh access token using refresh token:',
      refreshToken
    );

    if (!refreshToken) {
      console.log('No refresh token found, cannot refresh access token');
      return throwError(() => new Error('No refresh token found'));
    }

    return this.http
      .post<{ access: { token: string } }>(API_ENDPOINTS.REFRESH, {
        refreshToken,
      })
      .pipe(
        tap((response) => {
          console.log('Refresh token response:', response);
          this.storeAccessToken(response.access.token);
        }),
        catchError((error) => {
          console.error('Error refreshing token:', error);
          this.logout();
          return throwError(() => new Error('Token refresh failed'));
        }),
        map((response) => response.access.token)
      );
  }

  logout(): void {
    this.clearStorage();
    this.setLoggedIn(false);
    this.router.navigate(['/login']);
  }

  getCurrentUserRole(): string | null {
    const roles = this.getUserRole();
    console.log('Roles from storage:', roles);
    return roles && roles.length > 0 ? roles[0].toLowerCase() : null;
  }

  getUserId(): string | null {
    return localStorage.getItem(this.USER_ID_KEY);
  }

  storeTokens(accessToken: string, refreshToken: string): void {
    this.storeAccessToken(accessToken);
    this.storeRefreshToken(refreshToken);
  }

  storeAccessToken(token: string): void {
    // console.log('Storing access token:', token);
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  storeRefreshToken(token: string): void {
    // console.log('Storing refresh token:', token);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, token);
  }

  storeUserRole(role: string[]): void {
    localStorage.setItem(this.USER_ROLE_KEY, JSON.stringify(role));
  }

  storeUserId(userId: number): void {
    // console.log('Storing user ID:', userId);
    localStorage.setItem(this.USER_ID_KEY, userId.toString());
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getUserRole(): string[] | null {
    const role = localStorage.getItem(this.USER_ROLE_KEY);
    return role ? JSON.parse(role) : null;
  }

  clearStorage(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.USER_ROLE_KEY);
    localStorage.removeItem(this.USER_ID_KEY);
  }

  public setLoggedIn(status: boolean): void {
    this.isLoggedInSubject.next(status);
  }

  handleError(error: HttpErrorResponse) {
    console.error('Error occurred:', error);
    return throwError(
      () => new Error(error.error.message || 'Something went wrong')
    );
  }
}
