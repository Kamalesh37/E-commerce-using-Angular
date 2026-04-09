import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginMode = true;
  loading = false;
  error: string | null = null;
  successMessage: string | null = null;

  // Form Models
  user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  };

  constructor(
    private apiService: ApiService, 
    private router: Router,
    private cartService: CartService
  ) { }

  ngOnInit(): void {
    if (this.apiService.isLoggedIn()) {
      this.router.navigate(['/dashboard']);
    }
  }

  toggleMode() {
    this.isLoginMode = !this.isLoginMode;
    this.error = null;
    this.successMessage = null;
  }

  onSubmit() {
    this.loading = true;
    this.error = null;

    if (this.isLoginMode) {
      this.apiService.login({ email: this.user.email, password: this.user.password }).subscribe({
        next: (res) => {
          this.apiService.setToken(res.access_token);
          this.cartService.syncLocalToCloud();
          this.router.navigate(['/dashboard']);
          this.loading = false;
        },
        error: (err) => {
          this.error = err.error?.message || 'Invalid email or password. Please try again.';
          this.user.password = '';
          this.loading = false;
          console.error(err);
        }
      });
    } else {
      // Registration
      if (this.user.password !== this.user.password_confirmation) {
          this.error = 'Passwords do not match. Please retype them.';
          this.user.password = '';
          this.user.password_confirmation = '';
          this.loading = false;
          return;
      }

      this.apiService.register(this.user).subscribe({
        next: (res) => {
          this.apiService.setToken(res.access_token);
          this.cartService.syncLocalToCloud();
          this.successMessage = 'Registration successful! Taking you to dashboard...';
          setTimeout(() => {
            this.router.navigate(['/dashboard']);
          }, 1500);
          this.loading = false;
        },
        error: (err) => {
          if (err.error && err.error.errors) {
            const firstKey = Object.keys(err.error.errors)[0];
            this.error = err.error.errors[firstKey][0];
          } else {
            this.error = 'Warning: Registration details rejected. Please verify your info.';
          }
          this.user.password = '';
          this.user.password_confirmation = '';
          this.loading = false;
          console.error(err);
        }
      });
    }
  }
}
