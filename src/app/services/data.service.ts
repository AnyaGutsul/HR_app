import { Injectable } from '@angular/core';
import { userData } from '../interfaces/userData';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getUsers(): Observable<userData[]> {
    return this.http.get<userData[]>('http://localhost:8080/users')
  }
  getUserInfo(userId: string): Observable<userData> {
    return this.http.get<userData>('http://localhost:8080/user', { params: { Id: userId } })
  }


}
