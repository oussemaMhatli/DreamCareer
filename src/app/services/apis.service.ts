import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApisService {
  apiUrl:string='https://dreamcareer.onrender.com/'

  constructor() { }
   getHeaders(tokenText :string): HttpHeaders {
    const token = tokenText;
    console.log('Token:', token);

    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

}
