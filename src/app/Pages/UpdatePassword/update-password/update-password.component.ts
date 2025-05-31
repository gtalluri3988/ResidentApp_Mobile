import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl, ValidationErrors, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';
import { ForgotPassword } from '@model/forgot-password.model';
import { AuthService } from '@services/AuthService/auth.service';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { routes } from 'src/app/app.routes';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [FormsModule, NgIf, ReactiveFormsModule, RouterModule, RouterModule],
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.css']
})
export class UpdatePasswordComponent {
  submitted = false;
  residentId: string = '';
  apiErrorMessage: string = '';
  router = inject(Router);
  auth = inject(AuthService);
  route = inject(ActivatedRoute);
  changePasswordForm: FormGroup;

  constructor() {
    this.changePasswordForm = new FormGroup({
      residentId: new FormControl(''),
      currentPassword: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    }, { validators: this.passwordMatchValidator });


    this.residentId = this.route.snapshot.paramMap.get('id') || '';
  }

  get f() {
    return this.changePasswordForm.controls;
  }

  updatePassword() {
    this.submitted = true;

    Object.values(this.changePasswordForm.controls).forEach(control => {
      control.markAsTouched();
      control.updateValueAndValidity();
    });

    if (this.changePasswordForm.invalid) {
      return;
    }

    const loginData: ForgotPassword = this.changePasswordForm.value;
    loginData.residentId = parseInt(this.residentId);
    this.auth.changePassword(loginData).subscribe({
      next: (response: any) => {
        alert(response.result);
        this.router.navigateByUrl('/login');
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }

  passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }
}
