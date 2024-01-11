import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface';
import { BunFile } from 'bun';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private readonly http: HttpClient) {}

  readonly baseURL = 'http://localhost:3000';

  getUserInfo() {
    return this.http.get<User>(`${this.baseURL}/user-info`);
  }

  getUserImage() {
    return this.http.get<BunFile>(`${this.baseURL}/user-image`);
  }
}
