import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../db/db.interface';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { createUniqueUsernameValidator } from './uniqueUsername.validator';
import { DbService } from '../db/db.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-register',
  standalone: true,

  imports: [InputTextModule, FormsModule, ReactiveFormsModule, ButtonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  user: User | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dbService: DbService
  ) {}

  register(): void {
    if (this.registerFormGroup.valid) {
      const { username, displayName } = this.registerFormGroup.value;

      this.authService.register(username as string, displayName as string);
      this.router.navigate(['/']);
    }
  }

  registerFormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      createUniqueUsernameValidator(
        this.dbService.users.map((user) => user.username)
      ),
    ]),
    displayName: new FormControl('', [
      Validators.required,
      Validators.maxLength(20),
    ]),
  });
}
