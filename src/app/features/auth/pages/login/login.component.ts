import { AuthService } from '../../../../core/services/auth/auth.service';
import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ILoginResponse } from '../../models/login-response.model';
import { Router, RouterLink } from '@angular/router';
import { ILoginRequest } from '../../models/login-request.model';
import { PROJECT_PAGES } from '../../../../shared/pages/project-pages.model';
import { ButtonComponent } from "../../../../shared/components/button/button.component";

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink, ButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnInit {
  private fb: FormBuilder = new FormBuilder();
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm!: FormGroup;
  ErrorMes: WritableSignal<string> = signal('');
  isLoading: WritableSignal<boolean> = signal(false);
  showPassword: WritableSignal<boolean> = signal(false);

  initForm(): void {
    this.loginForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      password: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^[A-Z][a-z0-9]{5,20}$/),
      ]),
    });
  }
  onLogin(): void {
    if (this.loginForm.valid) {
      this.isLoading.set(true);
      this.authService.signIn(this.loginForm.value as ILoginRequest).subscribe({
        next: (response: ILoginResponse) => {
          localStorage.setItem('UserToken', response.token);
           this.isLoading.set(false);
          this.router.navigate([PROJECT_PAGES.dashboard.base]);
        },
        error: (error: any) => {
          this.ErrorMes.set(
            error.error.message ||
              'An error occurred during login. Please try again.',
          );
        },
      });
    }else{
       this.isLoading.set(false);
      this.loginForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.initForm();
  }
}
