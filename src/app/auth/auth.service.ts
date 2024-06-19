import { Injectable, signal } from '@angular/core';
import { DbService } from '../db/db.service';
import { User } from '../db/db.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private db: DbService) {}

  authenticatedUser = signal<User | null>(this.db.authenticatedUser);

  login(username: string): void {
    const user = this.db.users.find((user) => user.username === username);

    if (user) {
      this.db.authenticatedUser = user; // set current authenticated user
      this.authenticatedUser.update(() => user); // update signal
    }
  }

  logout(): void {
    this.db.authenticatedUser = null;
    this.authenticatedUser.update(() => null);
  }

  register(username: string, displayName: string): void {
    const user = {
      id: this.db.users.length + 1,
      username,
      displayName,
    };

    this.db.user = user; // append to users arr
    this.db.authenticatedUser = user; // add current authenticated user
    this.authenticatedUser.update(() => user); // update signal
  }
}
