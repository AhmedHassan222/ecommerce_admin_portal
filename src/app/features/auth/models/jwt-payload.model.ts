export interface IJwtPayload {
  id: string;
  email: string;
  exp: number;
  iat: number;
}