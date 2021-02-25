import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '@environments/environment';
import { User } from '@app/models/identity';

const baseUrl = `${environment.apiUrl}/users`;

@Injectable()
export class UserService {
    constructor(private http: HttpClient) { }

    getAll(): Observable<User[]> {
        return this.http.get<User[]>(baseUrl);
    }

    getById(id: string): Observable<User> {
        return this.http.get<User>(`${baseUrl}/${id}`);
    }

    create(params: any): Observable<any> {
      return this.http.post(baseUrl, params);
    }

    update(id: string, params: any): Observable<any> {
        return this.http.put(`${baseUrl}/${id}`, params);
    }

    delete(id: string): Observable<any> {
        return this.http.delete(`${baseUrl}/${id}`);
    }
}
