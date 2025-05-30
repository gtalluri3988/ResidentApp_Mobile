import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@services/AuthService/auth.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { LoginModel } from '@model/login.model';

LoginModel
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'

})
export class ForgotPasswordComponent {
  loginModel: LoginModel = new LoginModel();
  submitted = false;
  apiErrorMessage: string = ''; // ✅ Store API error message
  router = inject(Router)
  auth = inject(AuthService);

  private fb = inject(FormBuilder);  // Using `inject()` for dependency injection

  loginForm: FormGroup = this.fb.group({
    Username: ['', [Validators.required]],

  });

  get f() {
    return this.loginForm.controls;
  }

  resetPassword() {
    this.submitted = true;

    // ✅ Force validation update on all controls
    Object.values(this.loginForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    if (this.loginForm.invalid) {
      return;
    }

    const loginData: LoginModel = this.loginForm.value;

    this.auth.reSetPassword(loginData.Username).subscribe({
      next: (response: any) => {
        alert(response.result);
        this.router.navigateByUrl('/login');

      },
      error: (err) => {
        //this.apiErrorMessage = err.message;
        alert(err.message);
      }
    });
  }
}
