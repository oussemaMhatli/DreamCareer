import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  url:string='https://dreamcareer.onrender.com/'

  constructor(private http:HttpClient) { }
  private getHeaders(tokenText :string): HttpHeaders {
    const token = tokenText;
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getPosts(token:string): Observable<any> {
    const headers = this.getHeaders(token);
    const url = `${this.url}p`;

    return this.http.get<any>(url, { headers });
  }

}
