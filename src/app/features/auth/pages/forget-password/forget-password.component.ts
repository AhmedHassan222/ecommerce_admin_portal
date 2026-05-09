import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../../core/services/auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  imports: [ReactiveFormsModule],
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.scss',
})
export class ForgetPasswordComponent implements OnInit {
  private fb: FormBuilder = new FormBuilder();
  private authService = inject(AuthService);
  private router = inject(Router);

  currentStep: WritableSignal<number> = signal(1);
  isLoading: WritableSignal<boolean> = signal(false);
  errorMessage: WritableSignal<string> = signal('');
  verfiyEmailForm!: FormGroup;
  verifyCodeForm!: FormGroup;
  newPasswordForm!: FormGroup;

  initForms(): void {
    this.verfiyEmailForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
    });
    this.verifyCodeForm = this.fb.group({
      resetCode: this.fb.control('', [
        Validators.required,
        Validators.pattern(/^[0-9]{6}$/),
      ]),
    });
    this.newPasswordForm = this.fb.group({
      email: this.fb.control('', [Validators.required, Validators.email]),
      newPassword: this.fb.control('', [
        Validators.required,
        Validators.pattern(/\w{6,}$/),
      ]),
    });
  }

  sendEmail(): void {
    if (this.verfiyEmailForm.valid) {
      this.isLoading.set(true);
      this.authService.forgetPassword(this.verfiyEmailForm.value).subscribe({
        next: () => {
          const email = this.verfiyEmailForm.get('email')?.value;
          this.newPasswordForm.patchValue({
            email: email,
          });
          this.isLoading.set(false);
          this.currentStep.set(2);
          this.errorMessage.set('');
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error.message);
        },
      });
    } else {
      this.isLoading.set(false);
      this.verfiyEmailForm.markAllAsTouched();
    }
  }

  verifyCode(): void {
    if (this.verifyCodeForm.valid) {
      this.isLoading.set(true);
      this.authService.verifyResetCode(this.verifyCodeForm.value).subscribe({
        next: () => {
          this.isLoading.set(false);
          this.currentStep.set(3);
          this.errorMessage.set('');
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error.message);
        },
      });
    } else {
      this.isLoading.set(false);
      this.verifyCodeForm.markAllAsTouched();
    }
  }

  resetPassword(): void {
    console.log(this.newPasswordForm.value);
    if (this.newPasswordForm.valid) {
      this.isLoading.set(true);
      this.authService.resetPassword(this.newPasswordForm.value).subscribe({
        next: (res) => {
          this.isLoading.set(false);
          console.log(res);
          localStorage.setItem('userToken', res.token);
          this.router.navigate(['/login']);
        },
        error: (err) => {
          this.isLoading.set(false);
          this.errorMessage.set(err.error.message);
        },
      });
    } else {
      this.isLoading.set(false);
      this.newPasswordForm.markAllAsTouched();
    }
  }
  ngOnInit(): void {
    this.initForms();
  }
}
