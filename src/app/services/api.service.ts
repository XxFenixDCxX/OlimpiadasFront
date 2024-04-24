import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseURL = 'http://127.0.0.1:8000';
  token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Ikt3T2M0c1RJM05XbUZfbVRlLVo3eCJ9.eyJpc3MiOiJodHRwczovL29saW1waWFkYXMuZXUuYXV0aDAuY29tLyIsInN1YiI6Im15ajFmTDZmaEFqOEN3ZFRyYzdnVnMyVmo4WVBVdWhMQGNsaWVudHMiLCJhdWQiOiJodHRwczovL29saW1waWFkYXMuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJpYXQiOjE3MTM5NDgyMjUsImV4cCI6MTcxNjU0MDIyNSwic2NvcGUiOiJyZWFkOmNsaWVudF9ncmFudHMgY3JlYXRlOmNsaWVudF9ncmFudHMgZGVsZXRlOmNsaWVudF9ncmFudHMgdXBkYXRlOmNsaWVudF9ncmFudHMgcmVhZDp1c2VycyB1cGRhdGU6dXNlcnMgZGVsZXRlOnVzZXJzIGNyZWF0ZTp1c2VycyByZWFkOnVzZXJzX2FwcF9tZXRhZGF0YSB1cGRhdGU6dXNlcnNfYXBwX21ldGFkYXRhIGRlbGV0ZTp1c2Vyc19hcHBfbWV0YWRhdGEgY3JlYXRlOnVzZXJzX2FwcF9tZXRhZGF0YSByZWFkOnVzZXJfY3VzdG9tX2Jsb2NrcyBjcmVhdGU6dXNlcl9jdXN0b21fYmxvY2tzIGRlbGV0ZTp1c2VyX2N1c3RvbV9ibG9ja3MgY3JlYXRlOnVzZXJfdGlja2V0cyByZWFkOmNsaWVudHMgdXBkYXRlOmNsaWVudHMgZGVsZXRlOmNsaWVudHMgY3JlYXRlOmNsaWVudHMgcmVhZDpjbGllbnRfa2V5cyB1cGRhdGU6Y2xpZW50X2tleXMgZGVsZXRlOmNsaWVudF9rZXlzIGNyZWF0ZTpjbGllbnRfa2V5cyByZWFkOmNvbm5lY3Rpb25zIHVwZGF0ZTpjb25uZWN0aW9ucyBkZWxldGU6Y29ubmVjdGlvbnMgY3JlYXRlOmNvbm5lY3Rpb25zIHJlYWQ6cmVzb3VyY2Vfc2VydmVycyB1cGRhdGU6cmVzb3VyY2Vfc2VydmVycyBkZWxldGU6cmVzb3VyY2Vfc2VydmVycyBjcmVhdGU6cmVzb3VyY2Vfc2VydmVycyByZWFkOmRldmljZV9jcmVkZW50aWFscyB1cGRhdGU6ZGV2aWNlX2NyZWRlbnRpYWxzIGRlbGV0ZTpkZXZpY2VfY3JlZGVudGlhbHMgY3JlYXRlOmRldmljZV9jcmVkZW50aWFscyByZWFkOnJ1bGVzIHVwZGF0ZTpydWxlcyBkZWxldGU6cnVsZXMgY3JlYXRlOnJ1bGVzIHJlYWQ6cnVsZXNfY29uZmlncyB1cGRhdGU6cnVsZXNfY29uZmlncyBkZWxldGU6cnVsZXNfY29uZmlncyByZWFkOmhvb2tzIHVwZGF0ZTpob29rcyBkZWxldGU6aG9va3MgY3JlYXRlOmhvb2tzIHJlYWQ6YWN0aW9ucyB1cGRhdGU6YWN0aW9ucyBkZWxldGU6YWN0aW9ucyBjcmVhdGU6YWN0aW9ucyByZWFkOmVtYWlsX3Byb3ZpZGVyIHVwZGF0ZTplbWFpbF9wcm92aWRlciBkZWxldGU6ZW1haWxfcHJvdmlkZXIgY3JlYXRlOmVtYWlsX3Byb3ZpZGVyIGJsYWNrbGlzdDp0b2tlbnMgcmVhZDpzdGF0cyByZWFkOmluc2lnaHRzIHJlYWQ6dGVuYW50X3NldHRpbmdzIHVwZGF0ZTp0ZW5hbnRfc2V0dGluZ3MgcmVhZDpsb2dzIHJlYWQ6bG9nc191c2VycyByZWFkOnNoaWVsZHMgY3JlYXRlOnNoaWVsZHMgdXBkYXRlOnNoaWVsZHMgZGVsZXRlOnNoaWVsZHMgcmVhZDphbm9tYWx5X2Jsb2NrcyBkZWxldGU6YW5vbWFseV9ibG9ja3MgdXBkYXRlOnRyaWdnZXJzIHJlYWQ6dHJpZ2dlcnMgcmVhZDpncmFudHMgZGVsZXRlOmdyYW50cyByZWFkOmd1YXJkaWFuX2ZhY3RvcnMgdXBkYXRlOmd1YXJkaWFuX2ZhY3RvcnMgcmVhZDpndWFyZGlhbl9lbnJvbGxtZW50cyBkZWxldGU6Z3VhcmRpYW5fZW5yb2xsbWVudHMgY3JlYXRlOmd1YXJkaWFuX2Vucm9sbG1lbnRfdGlja2V0cyByZWFkOnVzZXJfaWRwX3Rva2VucyBjcmVhdGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiBkZWxldGU6cGFzc3dvcmRzX2NoZWNraW5nX2pvYiByZWFkOmN1c3RvbV9kb21haW5zIGRlbGV0ZTpjdXN0b21fZG9tYWlucyBjcmVhdGU6Y3VzdG9tX2RvbWFpbnMgdXBkYXRlOmN1c3RvbV9kb21haW5zIHJlYWQ6ZW1haWxfdGVtcGxhdGVzIGNyZWF0ZTplbWFpbF90ZW1wbGF0ZXMgdXBkYXRlOmVtYWlsX3RlbXBsYXRlcyByZWFkOm1mYV9wb2xpY2llcyB1cGRhdGU6bWZhX3BvbGljaWVzIHJlYWQ6cm9sZXMgY3JlYXRlOnJvbGVzIGRlbGV0ZTpyb2xlcyB1cGRhdGU6cm9sZXMgcmVhZDpwcm9tcHRzIHVwZGF0ZTpwcm9tcHRzIHJlYWQ6YnJhbmRpbmcgdXBkYXRlOmJyYW5kaW5nIGRlbGV0ZTpicmFuZGluZyByZWFkOmxvZ19zdHJlYW1zIGNyZWF0ZTpsb2dfc3RyZWFtcyBkZWxldGU6bG9nX3N0cmVhbXMgdXBkYXRlOmxvZ19zdHJlYW1zIGNyZWF0ZTpzaWduaW5nX2tleXMgcmVhZDpzaWduaW5nX2tleXMgdXBkYXRlOnNpZ25pbmdfa2V5cyByZWFkOmxpbWl0cyB1cGRhdGU6bGltaXRzIGNyZWF0ZTpyb2xlX21lbWJlcnMgcmVhZDpyb2xlX21lbWJlcnMgZGVsZXRlOnJvbGVfbWVtYmVycyByZWFkOmVudGl0bGVtZW50cyByZWFkOmF0dGFja19wcm90ZWN0aW9uIHVwZGF0ZTphdHRhY2tfcHJvdGVjdGlvbiByZWFkOm9yZ2FuaXphdGlvbnNfc3VtbWFyeSBjcmVhdGU6YXV0aGVudGljYXRpb25fbWV0aG9kcyByZWFkOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgdXBkYXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgZGVsZXRlOmF1dGhlbnRpY2F0aW9uX21ldGhvZHMgcmVhZDpvcmdhbml6YXRpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25zIGRlbGV0ZTpvcmdhbml6YXRpb25zIGNyZWF0ZTpvcmdhbml6YXRpb25fbWVtYmVycyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJzIGRlbGV0ZTpvcmdhbml6YXRpb25fbWVtYmVycyBjcmVhdGU6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHJlYWQ6b3JnYW5pemF0aW9uX2Nvbm5lY3Rpb25zIHVwZGF0ZTpvcmdhbml6YXRpb25fY29ubmVjdGlvbnMgZGVsZXRlOm9yZ2FuaXphdGlvbl9jb25uZWN0aW9ucyBjcmVhdGU6b3JnYW5pemF0aW9uX21lbWJlcl9yb2xlcyByZWFkOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgZGVsZXRlOm9yZ2FuaXphdGlvbl9tZW1iZXJfcm9sZXMgY3JlYXRlOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyByZWFkOm9yZ2FuaXphdGlvbl9pbnZpdGF0aW9ucyBkZWxldGU6b3JnYW5pemF0aW9uX2ludml0YXRpb25zIGRlbGV0ZTpwaG9uZV9wcm92aWRlcnMgY3JlYXRlOnBob25lX3Byb3ZpZGVycyByZWFkOnBob25lX3Byb3ZpZGVycyB1cGRhdGU6cGhvbmVfcHJvdmlkZXJzIGRlbGV0ZTpwaG9uZV90ZW1wbGF0ZXMgY3JlYXRlOnBob25lX3RlbXBsYXRlcyByZWFkOnBob25lX3RlbXBsYXRlcyB1cGRhdGU6cGhvbmVfdGVtcGxhdGVzIGNyZWF0ZTplbmNyeXB0aW9uX2tleXMgcmVhZDplbmNyeXB0aW9uX2tleXMgdXBkYXRlOmVuY3J5cHRpb25fa2V5cyBkZWxldGU6ZW5jcnlwdGlvbl9rZXlzIHJlYWQ6c2Vzc2lvbnMgZGVsZXRlOnNlc3Npb25zIHJlYWQ6cmVmcmVzaF90b2tlbnMgZGVsZXRlOnJlZnJlc2hfdG9rZW5zIGNyZWF0ZTpzZWxmX3NlcnZpY2VfcHJvZmlsZXMgcmVhZDpzZWxmX3NlcnZpY2VfcHJvZmlsZXMgdXBkYXRlOnNlbGZfc2VydmljZV9wcm9maWxlcyBkZWxldGU6c2VsZl9zZXJ2aWNlX3Byb2ZpbGVzIGNyZWF0ZTpzc29fYWNjZXNzX3RpY2tldHMgcmVhZDpjbGllbnRfY3JlZGVudGlhbHMgY3JlYXRlOmNsaWVudF9jcmVkZW50aWFscyB1cGRhdGU6Y2xpZW50X2NyZWRlbnRpYWxzIGRlbGV0ZTpjbGllbnRfY3JlZGVudGlhbHMiLCJndHkiOiJjbGllbnQtY3JlZGVudGlhbHMiLCJhenAiOiJteWoxZkw2ZmhBajhDd2RUcmM3Z1ZzMlZqOFlQVXVoTCJ9.UcUirVI89HG4dUJ3-1jqd3D-B7mh7GX6LVs2Qo-hxah3WX5X1kYdhN6Ogr074GoZBb-WQI9FFFM2pZPO8CtetaYrKmxM-qzMqfaudjNzq4DzAdO8BqZGXnTJ0KR_BRqpjuFbjt13eyH0Xd-hUXtnrq-l73veCg0vNoY77nd5ZmzkBYAWLVPhDHXdi15FskzPnyTvg5sdFvMwQeI_gXw_H40G8XauBZe_oq4fegYFNdFSNatp-txfmY8ISlGW-GJGG9Lc0yxtWrrVH5AvW0AYXh0H0Mi8ZiWaQagJqsPE3l-dEff-HpkgnB-rXKIqpvBNJSJHrDkBZmSxr1YH6ICJKA';
  constructor(private http: HttpClient) {
  }

  private getHttpOptions() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${this.token}`
      })
    };
    return httpOptions;
  }

  async getEspecificUser(sub: string): Promise<Observable<any>> {
    const options = this.getHttpOptions();
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
    return this.http.put<any>(`${this.baseURL}/notification/mark-as-read/${id}`, options);
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
    return this.http.get<any>(`${this.baseURL}/sections/${id}`, options);
  }

  async purchase(data: any): Promise<Observable<any>> {
    const options = await this.getHttpOptions();
    return this.http.post<any>(`${this.baseURL}/purchases`, data, options);
  }
}
