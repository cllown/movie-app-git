import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { environment } from '../../../environments/environment';
import {
  CreateSessionIdResponse,
  PermissionResponse,
  RequestTokenResponse,
} from '../../models/responce.inetrface';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get request token', () => {
    const mockResponse: RequestTokenResponse = {
      success: true,
      expires_at: '2024-01-01T00:00:00Z',
      request_token: 'test_token',
    };

    service.getRequestToken().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/authentication/token/new?api_key=${environment.apiKey}`
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should ask for permission', () => {
    const mockResponse: PermissionResponse = {
      success: true,
      request_token: 'test_token',
    };
    const username = 'testuser';
    const password = 'testpass';
    const token = 'test_token';

    service
      .askForPermission(username, password, token)
      .subscribe((response) => {
        expect(response).toEqual(mockResponse);
      });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/authentication/token/validate_with_login?api_key=${environment.apiKey}`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      username: username,
      password: password,
      request_token: token,
    });
    req.flush(mockResponse);
  });

  it('should create session id', () => {
    const mockResponse: CreateSessionIdResponse = {
      success: true,
      session_id: 'test_session_id',
    };
    const token = 'test_token';

    service.createSessionId(token).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(
      `${environment.apiBaseUrl}/authentication/session/new?api_key=${environment.apiKey}`
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      request_token: token,
    });
    req.flush(mockResponse);
  });

  it('should set and get token', () => {
    const token = 'test_token';
    service.setToken(token);
    expect((service as any).token).toBe(token);
  });

  it('should set and get sessionId', () => {
    const sessionId = 'test_session_id';
    service.setSessionId(sessionId);
    expect((service as any).sessionId).toBe(sessionId);
  });

  it('should return null if sessionId is not set', () => {
    expect(service.getSessionId()).toBeNull();
  });

  it('should return sessionId if it is set', () => {
    const sessionId = 'test_session_id';
    service.setSessionId(sessionId);
    expect(service.getSessionId()).toBe(sessionId);
  });
});
