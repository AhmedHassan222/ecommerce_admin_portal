import { IUser } from './user.model';

export interface ILoginResponse {
  message: string;
  token: string;
  user: IUser;
}