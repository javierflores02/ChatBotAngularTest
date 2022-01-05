import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Choice, Question } from 'src/app/Question';
import { UiService } from 'src/app/ui.service';
import { mainQuestion, choices, getChoices } from 'src/app/mockup-questions';

@Component({
  selector: 'app-chat-test',
  templateUrl: './chat-test.component.html',
  styleUrls: ['./chat-test.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  subscription: Subscription;
  messages: Question[] = [];
  choices: Choice[] = [];

  constructor(private uiService: UiService) {
    this.subscription = this.uiService.onToggle(this.messages).subscribe(
      value => this.messages = value
    )
  }

  scrollToBottom(): void {
    try {
      console.log(this.content);
      this.content.nativeElement.scrollTo(0, this.content.nativeElement.scrollHeight);
    } catch (err) {
      console.log(err);
    }
  }

  onResponse(choice: Choice){
    this.uiService.toggleAddMessage({
      id: 1,
      text: choice.text,
      bot: false,
      type: '',
    });
    this.uiService.toggleAddMessage(choice.nextQuestion!);
    this.choices = getChoices(choice.nextQuestion!, choices);
  }

  ngOnInit(): void {
    this.messages = [mainQuestion];
    this.choices = getChoices(mainQuestion, choices);
  }

}
