import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { User } from '../model/user';
import { ServerResponse } from '../../Model/serverresponse';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:4000";
  constructor(private http: HttpClient) { }

  addUser(newUser: User): Observable<ServerResponse<User>> {
    return this.http.post<ServerResponse<User>>(`${this.url}/users/add`, newUser);
  } 

  retrieveUsers(searchKey?: string, sortKey?: string): Observable<ServerResponse<User[]>> {
    let params = new HttpParams();
    
    if (searchKey)
      params = params.append('searchKey', searchKey);
    if (sortKey)
      params = params.append('sortKey', sortKey);

    return this.http .get<ServerResponse<User[]>>(`${this.url}/users`, { params: params });
  }

  getUserByID(userID: number): Observable<ServerResponse<User>> {
    return this.http.get<ServerResponse<User>>(`${this.url}/users/${userID}`);
  }

  updateUser(UserData: User): Observable<ServerResponse<User>> {
    return this.http.post<ServerResponse<User>>(`${this.url}/users/edit`, UserData);
  }  
        
  deleteUser(userID: number): Observable<ServerResponse<User>> {
    return this.http.get<ServerResponse<User>>(`${this.url}/users/delete/${userID}`);
  }  
}
