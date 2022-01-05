import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Message, Choice } from '../components/bharatrpatil-chat/bharatrpatil-chat.component';

export interface Poliza {
  id: number;
  descripcion?: string;
  fecha: string;
}

@Injectable({
  providedIn: 'root'
})
export class BhPolizaServiceService {

  constructor(private http: HttpClient) { }

  getPoliza(apiUrl: string, id: string): Observable<Poliza> {
    return this.http.get<Poliza>(apiUrl + id);
  }

  getQuestions(apiUrl: string): Observable<Message[]> {
    return this.http.get<Message[]>(apiUrl);
  }

  putDialog(id, formData): Observable<Message> {
    return this.http.put<Message>("https://localhost:7247/Dialog/" + id, formData);
  }

  postDialog(formData): Observable<Message> {
    return this.http.post<Message>("https://localhost:7247/Dialog/", formData);
  }

  deleteDialog(id): Observable<Message> {
    return this.http.delete<Message>("https://localhost:7247/Dialog/" + id);
  }
  
  getChoices(apiUrl: string): Observable<Choice[]> {
    return this.http.get<Choice[]>(apiUrl);
  }

  putChoice(id, formData): Observable<Choice> {
    return this.http.put<Choice>("https://localhost:7247/Choice/" + id, formData);
  }

  postChoice(formData): Observable<Choice> {
    return this.http.post<Choice>("https://localhost:7247/Choice/", formData);
  }

  deleteChoice(id): Observable<Choice> {
    return this.http.delete<Choice>("https://localhost:7247/Choice/" + id);
  }

}
