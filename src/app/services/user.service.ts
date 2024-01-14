import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/User';
import { ApisService } from './apis.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient ,private apiService:ApisService) { }
  url:string=this.apiService.apiUrl
  ;
   login(login:any):Observable<any>{
    console.log();
   return this.http.post(`${this.url}login`,login)
  }
  register(user:User):Observable<any>{
    return this.http.post(`${this.url}register`,user)

  }



    getUser(userId: string,token:string): Observable<any> {
      const headers = this.apiService.getHeaders(token);
      const url = `${this.url}u/${userId}`;

      return this.http.get<any>(url, { headers });
    }
    getUserByUsernameOrId(userIdOrUsename: string,token:string): Observable<any> {
      const headers = this.apiService.getHeaders(token);
      const url = `${this.url}u/${userIdOrUsename}`;

      return this.http.get<any>(url, { headers });
    }
    getUserPosts(username: string,token:string,pagenumber:number): Observable<any> {
      const headers = this.apiService.getHeaders(token);
      const url = `${this.url}u/${username}/posts?page=${pagenumber}`;

      return this.http.get<any>(url, { headers });
    }
    getUserFollowings(userId: string,token:string): Observable<any> {
      const headers = this.apiService.getHeaders(token);
      const url = `${this.url}u/${userId}/followings`;

      return this.http.get<any>(url, { headers });
    }
    getUserFollowers(userId: string,token:string): Observable<any> {
      const headers = this.apiService.getHeaders(token);
      const url = `${this.url}u/${userId}/followers`;

      return this.http.get<any>(url, { headers });
    }
    followUnfollow(userId: string,token:string,fid:any): Observable<any> {
      const headers = this.apiService.getHeaders(token);
      const url = `${this.url}u/${userId}/followings`;

      return this.http.patch<any>(url,fid ,{ headers });
    }

}
