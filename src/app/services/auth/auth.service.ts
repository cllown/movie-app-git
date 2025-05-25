import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateSessionIdResponse,
  PermissionResponse,
  RequestTokenResponse,
} from '../../models/responce.inetrface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private token: string | null = null;
  private sessionId: string | null = null;

  constructor(private httpClient: HttpClient) {}

  private getOptions() {
    return { params: new HttpParams().set('api_key', environment.apiKey) };
  }

  setToken(token: string) {
    this.token = token;
  }

  setSessionId(sessionId: string | null): void {
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
      username: username,
      password: password,
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
}
