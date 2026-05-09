import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILoginRequest } from '../../../features/auth/models/login-request.model';
import { ILoginResponse } from '../../../features/auth/models/login-response.model';
import { IForgetPasswordRequest } from '../../../features/auth/models/forget-password-request.model';
import { IForgetPasswordResponse } from '../../../features/auth/models/forget-password-response.model';
import { IVerifyResetCodeRequest } from '../../../features/auth/models/verify-reset-code-request.model';
import { IVerifyResetCodeResponse } from '../../../features/auth/models/verify-reset-code-response.model';
import { IResetPasswordResponse } from '../../../features/auth/models/reset-password-response.model';
import { IResetPasswordRequest } from '../../../features/auth/models/reset-password-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private httpClient: HttpClient) {}
  signIn(data: ILoginRequest): Observable<ILoginResponse> {
    // url should be added here
    return this.httpClient.post<ILoginResponse>(
      `https://ecommerce.routemisr.com/api/v1/auth/signin`,
      data,
    );
  }
  forgetPassword(data:IForgetPasswordRequest):Observable<IForgetPasswordResponse> {
    return this.httpClient.post<IForgetPasswordResponse>(
      `https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`,
      data,
    );
  }
  verifyResetCode(data: IVerifyResetCodeRequest):Observable<IVerifyResetCodeResponse> {
    return this.httpClient.post<IVerifyResetCodeResponse>(
      `https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`,
      data,
    );
  }
  resetPassword(data: IResetPasswordRequest):Observable<IResetPasswordResponse> {
    return this.httpClient.put<IResetPasswordResponse>(
      `https://ecommerce.routemisr.com/api/v1/auth/resetPassword`,
      data,
    );
  }
}
