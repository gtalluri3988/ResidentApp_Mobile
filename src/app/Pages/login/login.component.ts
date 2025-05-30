import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@services/AuthService/auth.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { LoginModel } from '@model/login.model';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent {
  loginModel: LoginModel = new LoginModel();
  submitted = false;
  apiErrorMessage: string = ''; // ✅ Store API error message
  router = inject(Router)
  auth = inject(AuthService);
  route = inject(ActivatedRoute);

  private fb = inject(FormBuilder);  // Using `inject()` for dependency injection

  loginForm: FormGroup = this.fb.group({
    Username: ['', [Validators.required]],
    Password: ['', [Validators.required]],
  });


  get f() {
    return this.loginForm.controls;
  }

  login() {
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

    this.auth.residentLogin({ Username: loginData.Username, password: loginData.Password, roleId: 5 }).subscribe({
      next: (response: any) => {
        if (!response.error && response.data.token) {
          this.auth.startIdleWatch()
          localStorage.setItem('jwtToken', response.data.token);
          localStorage.setItem('role', this.auth.getUserRoles());
          localStorage.setItem('roleId', this.auth.getUserRoleId());
          this.router.navigateByUrl('/dashboard');
        }
        else {

          this.apiErrorMessage = 'Login failed';
          this.loginForm.setErrors({ apiError: true });
        }

      },
      error: (err) => {
        alert(err.message);
      }
    });
  }
}
