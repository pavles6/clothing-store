import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { createExistingUsernameValidator } from './existingUsername.validator';
import { DbService } from '../db/db.service';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, FormsModule, ReactiveFormsModule, InputTextModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private dbService: DbService
  ) {}

  loginFormControl = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      createExistingUsernameValidator(
        this.dbService.users.map((user) => user.username)
      ),
    ]),
  });

  login(): void {
    if (this.loginFormControl.valid) {
      const { username } = this.loginFormControl.value;

      this.authService.login(username as string);
      this.router.navigate(['/']);
    }
  }
}
