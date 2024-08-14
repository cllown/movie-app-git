import { Movie } from "./movie";


export interface MovieListResponse {
  dates: {
    maximum: string,
    minimum: string,
  },
  page: number,
  results: Movie[],
  total_pages: number,
  total_results: number,
}

export interface RequestTokenResponse {
  success: boolean;
  expires_at: string;
  request_token: string;
}

export interface CreateSessionIdResponse {
  success: boolean;
  session_id: string;
}

export interface PermissionResponse {
  success: boolean;
  request_token: string;
}
