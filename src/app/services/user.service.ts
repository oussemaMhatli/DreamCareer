import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }
  url:string='https://dreamcareer.onrender.com/'
  ;
   login(login:any):Observable<any>{
    console.log();
   return this.http.post(`${this.url}login`,login)
  }
  register(user:User):Observable<any>{
    return this.http.post(`${this.url}register`,user)

  }

    private getHeaders(tokenText :string): HttpHeaders {
      const token = tokenText;
      return new HttpHeaders().set('Authorization', `Bearer ${token}`);
    }

    getUser(userId: string,token:string): Observable<any> {
      const headers = this.getHeaders(token);
      const url = `${this.url}u/${userId}`;

      return this.http.get<any>(url, { headers });
    }
}
