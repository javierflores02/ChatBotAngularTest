import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs'
import { Question } from './QuestionTest';
import { mainQuestion } from './mockup-questions';

@Injectable({
  providedIn: 'root'
})
export class UiService {

  private messages: Question[] = [mainQuestion];
  private subject = new Subject<any>();

  constructor() { }

  toggleAddMessage(message: Question, scrollToBottom?: Function): void {
    this.messages.push(message)
    scrollToBottom && scrollToBottom();
    this.subject.next(this.messages);
  }

  onToggle(messages?: Question[]): Observable<any> {
    messages && (this.messages = messages);
    return this.subject.asObservable();
  }
}