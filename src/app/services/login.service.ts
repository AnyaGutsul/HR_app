import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { user } from '../interfaces/user'
import { Observable } from 'rxjs';
import { loginRespond } from '../interfaces/login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  checkAuthorization(user: user): Observable<loginRespond> {
    return this.http.get<loginRespond>('http://localhost:8080/checkCredentials',
      { params: { username: user.username, password: user.password } })
  }
}
