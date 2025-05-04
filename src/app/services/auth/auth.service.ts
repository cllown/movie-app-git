import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateSessionIdResponse,
  PermissionResponse,
  RequestTokenResponse,
} from '../../models/responce.inetrface';
import { User } from '../../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private sessionId: string | null = null;
  private readonly USERS_KEY = 'registeredUsers';
  private readonly CURRENT_USER_KEY = 'currentUser';

  private currentUser$ = new BehaviorSubject<User | null>(null);

  constructor(private httpClient: HttpClient) {
    const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser) as User;
        this.currentUser$.next(parsedUser);
      } catch (e) {
        this.currentUser$.next(null);
      }
    }
  }

  private getOptions() {
    return { params: new HttpParams().set('api_key', environment.apiKey) };
  }

  setToken(token: string) {
    this.token = token;
  }

  setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  getSessionId(): string | null {
    return this.sessionId;
  }

  getRequestToken(): Observable<RequestTokenResponse> {
    return this.httpClient.get<RequestTokenResponse>(
      `${environment.apiBaseUrl}/authentication/token/new`,
      this.getOptions()
    );
  }

  askForPermission(
    username: string,
    password: string,
    token: string
  ): Observable<PermissionResponse> {
    const body = {
      username,
      password,
      request_token: token,
    };
    return this.httpClient.post<PermissionResponse>(
      `${environment.apiBaseUrl}/authentication/token/validate_with_login`,
      body,
      this.getOptions()
    );
  }

  createSessionId(token: string): Observable<CreateSessionIdResponse> {
    const body = {
      request_token: token,
    };
    return this.httpClient.post<CreateSessionIdResponse>(
      `${environment.apiBaseUrl}/authentication/session/new`,
      body,
      this.getOptions()
    );
  }

  register(username: string, password: string): Observable<boolean> {
    const users = this.getAllUsers();
    if (users.find((user) => user.username === username)) {
      return of(false);
    }

    const newUser: User = { username, password };
    users.push(newUser);
    localStorage.setItem(this.USERS_KEY, JSON.stringify(users));
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(newUser));
    this.currentUser$.next(newUser);
    return of(true);
  }

  login(username: string, password: string): Observable<boolean> {
    const users = this.getAllUsers();
    const user = users.find(
      (u) => u.username === username && u.password === password
    );
    if (user) {
      localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
      this.currentUser$.next(user);
      return of(true);
    }
    return of(false);
  }

  logout(): void {
    localStorage.removeItem(this.CURRENT_USER_KEY);
    this.currentUser$.next(null);
  }

  getCurrentUser(): User | null {
    return this.currentUser$.value;
  }

  isLoggedIn(): boolean {
    return this.getCurrentUser() !== null;
  }

  getAllUsers(): User[] {
    const raw = localStorage.getItem(this.USERS_KEY);
    return raw ? (JSON.parse(raw) as User[]) : [];
  }
}
