import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApisService } from './apis.service';

@Injectable({
  providedIn: 'root'
})
export class PostsService {


  constructor(private http:HttpClient,private apiService:ApisService) { }
  url:string=this.apiService.apiUrl;


  getPosts(token:string,pagenumber:number): Observable<any> {
    const headers = this.apiService.getHeaders(token);
    const url = `${this.url}p?page=${pagenumber}`;

    return this.http.get<any>(url, { headers });
  }
  getPostsbyId(token:string,id:string): Observable<any> {
    const headers = this.apiService.getHeaders(token);
    const url = `${this.url}p/${id}`;

    return this.http.get<any>(url, { headers });
  }
  like(token:string,id:string,username:any): Observable<any> {
    const headers = this.apiService.getHeaders(token);
    const url = `${this.url}p/${id}/likes`;

    return this.http.patch<any>(url,username, { headers });
  }
  delete(token:string,id:string,username:any): Observable<any> {
    const headers = this.apiService.getHeaders(token);
    const url = `${this.url}p/${id}`;

    return this.http.delete<any>(url, { headers });
  }
}

