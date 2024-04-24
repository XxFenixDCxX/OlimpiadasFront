import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient, private auth: AuthService) { }

  private async getHttpOptions() {
    const token = await this.auth.getAccessTokenSilently().toPromise();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${token}`
      })
    };
    return httpOptions;
  }

  async getEspecificUser(sub: string): Promise<Observable<any>> {
    const options = await this.getHttpOptions();
    return this.http.get<any>(`${this.baseURL}/users/${sub}`, options);
  }

  async getAllUsers(): Promise<Observable<any[]>> {
    const options = await this.getHttpOptions();
    return this.http.get<any[]>(`${this.baseURL}/users`, options);
  }

  async createUser(data: any): Promise<Observable<any>> {
    const options = await this.getHttpOptions();
    return this.http.post<any>(`${this.baseURL}/users`, data, options);
  }

  async updateUserZones(sub: string, zones: number[]): Promise<Observable<any>> {
    const options = await this.getHttpOptions();
    return this.http.put<any>(`${this.baseURL}/users/${sub}`, { zones }, options);
  }

  async getAllZones(): Promise<Observable<any[]>> {
    const options = await this.getHttpOptions();
    return this.http.get<any[]>(`${this.baseURL}/zones`, options);
  }

  async getEspecificUserNotifications(sub: string): Promise<Observable<any>> {
    const options = await this.getHttpOptions();
    return this.http.get<any>(`${this.baseURL}/notifications/${sub}`, options);
  }

  async getEspecificNotifications(id: number): Promise<Observable<any>> {
    const options = await this.getHttpOptions();
    return this.http.get<any>(`${this.baseURL}/notification/${id}`, options);
  }

  async markAsReadNotification(id: number): Promise<Observable<any>> {
    const options = await this.getHttpOptions();
    return this.http.put<any>(`${this.baseURL}/notification/mark-as-read/${id}`, null, options);
  }

  async getEspecificEvent(id: number): Promise<Observable<any>> {
    const options = await this.getHttpOptions();
    return this.http.get<any>(`${this.baseURL}/events/${id}`, options);
  }

  async getAllEvents(): Promise<Observable<any[]>> {
    const options = await this.getHttpOptions();
    return this.http.get<any[]>(`${this.baseURL}/events`, options);
  }

  async getEventSections(id: number): Promise<Observable<any[]>> {
    const options = await this.getHttpOptions();
    return this.http.put<any>(`${this.baseURL}/sections/${id}`, null, options);

  purchase(data: any): Observable<any> {
    return this.http.post<any>(`${this.baseURL}/purchases`, data);
  }
}
