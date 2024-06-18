import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  get isAuthenticated() {
    return localStorage.getItem('isAuthenticated') === 'true';
  }

  set isAuthenticated(value) {
    localStorage.setItem('isAuthenticated', value.toString());
  }

  login(username: string) {

    this.isAuthenticated = true;
    localStorage.setItem('isAuthenticated', 'true');
  }
}
