import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/users`);
  }

  createUser(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/users`, data);
  }

  updateUserZones(sub: string, zones: number[]): Observable<any> {
    return this.http.put<any>(`${this.baseURL}/users/${sub}`, { zones });
  }

  getAllZones(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}/zones`);
  }
}
