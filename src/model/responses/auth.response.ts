export interface RegisterResponse {
  message: string;
}

export interface LoginResponse<T> {
  user: T;
  token: string;
  message: string;
}

export interface LoginGoogleResponse<T> extends LoginResponse<T> {}

export interface RevalidateTokenResponse<T> extends LoginResponse<T> {}
