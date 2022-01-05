import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs'
import { Poliza } from '../Poliza';
import { Message } from '../components/bharatrpatil-chat/bharatrpatil-chat.component';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class PolizasService {

  constructor(private http: HttpClient) { }

  getPoliza(apiUrl: string, id: string): Observable<Poliza> {
    return this.http.get<Poliza>(apiUrl + id);
  }
}
