export interface LoginResponse {
  access: string;
  refresh: string;
  user: User;
  token: Token;
  error?: any;
  status: number;
}

export interface Token {

}

export interface User {
  id: number;
  email: string;
  name: string;
  created_at: string;
  updated_at?: string;
  deleted_at?: string;
}
export interface Login {
  username: string;
  password: string;
}
