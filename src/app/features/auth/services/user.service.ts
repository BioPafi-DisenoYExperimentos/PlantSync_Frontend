import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../../../environments/environment.development";
import {User} from "../model/user.entity";
import {BaseService} from "../../../shared/services/base.service";
@Injectable({
  providedIn: 'root'
})
export class UserService  extends  BaseService<User>{

  override resourceEndpoint = environment.ENDPOINT_PATH_USERS;



  private apiUrl = `${this.serverBaseUrl}${this.resourceEndpoint}`;

  constructor() {
    super();
  }



  getUserByEmail(email: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}?email=${email}`);
  }

  registerUser(user: User): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/sign-up`, user);
  }

  signIn(credentials: { email: string, password: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/sign-in`, credentials);
  }


  updateUser(id: number, user: User): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, user);
  }

}
