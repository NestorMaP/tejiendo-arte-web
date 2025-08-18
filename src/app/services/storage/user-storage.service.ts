import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';

const TOKEN = 'tejart-token';
const USER = 'tejart-user';

interface JwtPayload {
  exp: number;
  role?: string;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserStorageService {
  static router: any;

  
  constructor (
    private router: Router,
  ) {}

  public saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  public saveUser(user): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken(): string {
    return localStorage.getItem(TOKEN)
  }

  static getUser(): any {
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId(): string {
    const user = this.getUser();
    if(user == null) {
      return '';
    }
    return user.userId;
  }

  static getUserRole(): string {
    const user = this.getUser();
    if(user == null) {
      return '';
    }
    return user.role;
  }

  static isTokenExpired(): boolean {
    const token = this.getToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode<JwtPayload>(token);
      const now = Math.floor(Date.now() / 1000);

      if (decoded.exp && decoded.exp < now) {
        this.signOut();
        return true;
      }
      return false;
    } catch (error) {
      this.signOut();
      return true;
    }
  }

  static isAdminLoggedIn(): boolean {
    if(!this.getToken() || this.isTokenExpired()) return false;
    const role: string = this.getUserRole();
    return role == 'ADMIN';
  }

  static isCustomerLoggedIn(): boolean {
    if(!this.getToken() || this.isTokenExpired()) return false;

    const role: string = this.getUserRole();
    return role == 'CUSTOMER';
  }

  static signOut(): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.removeItem(USER);
  }
}
