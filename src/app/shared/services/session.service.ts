import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserSessionItem } from '../interfaces/user-session';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

const API_URL = `${environment.apiURL}/sessions`;

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  http: HttpClient = inject(HttpClient);
  router: Router = inject(Router);

  addSession(session: UserSessionItem) {
    return this.http.post<{msg: string}>(`${API_URL}/add_session`, session);
  }

  getSessionsByEmail(email: string): Observable<UserSessionItem[]> {
    return this.http.get<UserSessionItem[]>(`${API_URL}/email/${email}`);
  }

  deleteLastSessionByEmail(email: string): Observable<any> {
    return this.http.delete(`${API_URL}/delete_last_session_by_email/${email}`);
  }
}
