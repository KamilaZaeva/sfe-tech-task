import { Component, inject, signal, WritableSignal } from '@angular/core';
import {MatError, MatFormField, MatInput, MatLabel} from '@angular/material/input';
import { MatCard } from '@angular/material/card';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-login-page',
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatFormField,
    MatCard,
    ReactiveFormsModule,
    MatButton,
    MatError,
  ],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss',
})
export class LoginPageComponent {
  private fb: FormBuilder = inject(FormBuilder);
  private authService: AuthService = inject(AuthService);
  private router: Router = inject(Router);

  error: WritableSignal<string> = signal('');

  form = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  submit(): void {
    if (this.form.invalid) {
      this.error.set('Please enter username and password.');
      return;
    }

    const { username, password } = this.form.value;
    this.authService.login(username!, password!).subscribe({
      next: (res) => {
        if (res.token) {
          this.authService.setToken(res.token);
          void this.router.navigate(['/users']);
        } else {
          this.error.set('Invalid response from server.');
        }
      },
      error: () => {
        this.error.set('Login failed. Please check your credentials.');
      }
    });
  }
}
