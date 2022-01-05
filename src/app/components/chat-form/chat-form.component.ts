import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PolizasService } from 'src/app/services/polizas.service';
import { Question } from 'src/app/Question';
import { UiService } from 'src/app/ui.service';
import { Message } from '../../Message';

@Component({
  selector: 'app-chat-form',
  templateUrl: './chat-form.component.html',
  styleUrls: ['./chat-form.component.css']
})
export class ChatFormComponent implements OnInit {

  message: string = "";
  subscription: Subscription;
  lastMessage? : Question;


  constructor(private uiService: UiService, private polizasService: PolizasService) {
    this.subscription = this.uiService.onToggle().subscribe(
      value => {
        this.lastMessage = value.at(-1)
      }
    )
   }

  ngOnInit(): void {
  }

  onSubmit(){
    this.lastMessage.url && this.polizasService.getPoliza(this.lastMessage.url, this.message).subscribe(value => {
      let resp = new Date(value.fecha) >= new Date() ? "La poliza se encuentra vigente" : "La poliza se encuentra vencida"
      this.uiService.toggleAddMessage({ id: 1, text: resp, bot: true, type: '' });
      this.uiService.toggleAddMessage({
        id: 1,
        text: "test",
        bot: true,
        type: '',
      });
    });
    this.uiService.toggleAddMessage({id: 1, text: this.message, bot: false, type: ''});
    this.message = "";
  }

}
