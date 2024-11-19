import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { User } from 'src/app/core/interfaces/user.data';
import { API_ENDPOINTS } from 'src/app/app.constants';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  // Fetch user by ID
  getUserById(id: number): Observable<User> {
    const url = `${API_ENDPOINTS.GET_USERS}/${id}`;
    return this.httpClient.get<User>(url).pipe(
      tap((user) => {
        // console.log(user);
      })
    );
  }

  updateUser(id: number, user: User): Observable<User> {
    const url = `${API_ENDPOINTS.UPDATE_USERS}/${id}`;
    return this.httpClient.put<User>(url, user).pipe(
      tap((updatedUser) => {
        console.log('User updated in API:', updatedUser);
      })
    );
  }

  updateUserRole(id: number, role: string): Observable<User> {
    const url = `${API_ENDPOINTS.UPDATE_USERS}/${id}`;
    return this.httpClient.put<User>(url, { role }).pipe(
      tap((updatedUser) => {
        console.log('User role updated:', updatedUser);
      })
    );
  }
}
