import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApisService } from '../apis.service';
import { Observable } from 'rxjs';
import { MessageRequest } from 'src/app/models/MessageRequest';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http:HttpClient ,private apiService:ApisService) { }
  url:string=this.apiService.apiUrl
  getConversations(userId: string,token:string): Observable<any> {
    const headers = this.apiService.getHeaders(token);
    const url = `${this.url}cs/${userId}`;

    return this.http.get<any>(url, { headers });
  }
CreateConversation(token:string,body:any): Observable<any> {
    const headers = this.apiService.getHeaders(token);
    const url = `${this.url}cs`;

    return this.http.post<any>(url,body, { headers });
  }
  getMessages(token:string,csId:String): Observable<any> {
    const headers = this.apiService.getHeaders(token);
    const url = `${this.url}msg/${csId}`;

    return this.http.get<any>(url, { headers });
  }
  AddMessage(token:string,body:MessageRequest): Observable<any> {
    const headers = this.apiService.getHeaders(token);
    const url = `${this.url}msg`;

    return this.http.post<any>(url,body, { headers });
  }
}
