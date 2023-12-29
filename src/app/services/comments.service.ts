import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApisService } from './apis.service';
import { Coment, ComentBody } from '../models/Comment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

  constructor(private http:HttpClient,private apiService:ApisService) { }
  url:string=this.apiService.apiUrl;
  getCommentsById(id:string,token:string):Observable<Coment[]>{
    const headers = this.apiService.getHeaders(token);

    return this.http.get<Coment[]>(`${this.apiService.apiUrl}p/${id}/comments`,{headers})

  }
  addComments(id:string,coment:ComentBody,token:string){
    const headers = this.apiService.getHeaders(token);

    return this.http.post(`${this.apiService.apiUrl}p/${id}/comments`,coment,{headers})
  }
  deleteComments(postid:any,token:any,commentId:any){
    const headers = this.apiService.getHeaders(token);
return this.http.delete(`${this.apiService.apiUrl}p/${postid}/comments/${commentId}`,{headers})
  }
  LikeComments(postId:any,token:any,commentId:any,username:any){
    const headers = this.apiService.getHeaders(token);
return this.http.patch(`${this.apiService.apiUrl}p/${postId}/comments/${commentId}/likes`,username,{headers})
  }
}
