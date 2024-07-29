import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  CreateSessionIdResponse,
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

  askForPermission(token: string): Observable<RequestTokenResponse> {
    const body = {
      username: 'IngaLekhman',
      password: 'Inga2015',
      request_token: token,
    };
    return this.httpClient.post<RequestTokenResponse>(
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
