import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router // ✅ FIX: Add Router here
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.error = '';

    const formData = this.loginForm.value;

    this.http.post<any>('http://localhost:3000/api/login', formData).subscribe({
      next: (res) => {
        this.loading = false;
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify({
          id: res.id,
          login: true
        }));
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if (err.status === 401 && err.error?.error) {
          this.error = err.error.error;
        } else {
          this.error = 'Something went wrong. Please try again later.';
        }
        this.loading = false;
      }
    });
  }
}
