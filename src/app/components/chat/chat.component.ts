// bharatrpatil model

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { getChoice, getChoicesStr, getQuestion } from './mock-messages';
import { BhPolizaServiceService } from '../../services/bh-poliza-service.service';
import { Choice } from './../../Choice';
import { Message } from './../../Message';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  @ViewChild('content') content: ElementRef;
  chatdisplay: boolean = true;
  messages: Message[];
  message: string;
  loading: boolean = false;
  mockMessages: Message[];
  mockChoices: Choice[];

  constructor(private polizaService: BhPolizaServiceService) { 
    this.messages = [];
    this.message = "";
    this.mockMessages = [];
    this.mockChoices = [];
  }

  ngOnInit(): void {
    this.polizaService.getQuestions("https://localhost:7247/Dialog").subscribe(value => {
      this.mockMessages = value.filter((msg)=>{
        msg.from = "bot"
        return true
      });
      this.polizaService.getChoices("https://localhost:7247/Choice").subscribe(value => {
        this.mockChoices = value;
        this.controllerChat("");
      })
    })
  }

  chatDisplayClick(){
    this.chatdisplay = !this.chatdisplay;
  }

  scrollToBottom(): void {
    try {      
      this.content.nativeElement.scrollTo({
        top: this.content.nativeElement.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
    } catch (err) {
    }
  }

  onSubmit(){
    // Se agrega el dialogo a el arreglo de mensajes
    this.messages.push({
      id:  1,
      text:  this.message,
      from: 'me',
      type: "",
      previousQuestion: null
    })
    this.controllerChat(this.message, this.messages[this.messages.length - 2]);
    setTimeout(() => {
      this.scrollToBottom();
    }, 0);
    // Se vacía el contenido del input del chat
    this.message = "";
  }

  fechaStr(fecha: Date): string{
    const meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    const dias_semana = ['Domingo', 'Lunes', 'martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return dias_semana[fecha.getDay()] + ', ' + fecha.getDate() + ' de ' + meses[fecha.getMonth()] + ' de ' + fecha.getUTCFullYear();
  }

  async controllerChat(mensaje: string, lastQuestion?: Message){
    if(!lastQuestion) {
      let first = this.mockMessages[0]
      let second = this.mockMessages[1]
      second.text = getChoicesStr(second.id, true, this.mockChoices, this.mockMessages)
      this.messages.push(first, second)
    }else{
      const choice = getChoice(lastQuestion.id, parseInt(mensaje), this.mockChoices);
      if(choice){
        console.log(choice);
        let question = getQuestion(choice.nextQuestion, this.mockMessages);
        console.log(question);
        if (question.type === "choices"){
          question.text = getChoicesStr(question.id, false, this.mockChoices, this.mockMessages)
        }  
        this.messages.push(question)
      }else{
        if(lastQuestion.type === "input"){
          this.loading = true;
          this.polizaService.getPoliza(lastQuestion.url, this.message).subscribe(value => {
            let fecha = this.fechaStr(new Date(value.fecha))
            let resp = new Date(value.fecha) >= new Date() ? `La poliza se encuentra vigente, hasta el ${fecha}` : `La poliza se encuentra vencida, desde el ${fecha}`
            this.messages.push({ id: 1, text: resp, from: "bot", type: "", previousQuestion: lastQuestion.previousQuestion })
          }, error => {
            if(error.status == 404)
              this.messages.push({ id: 1, text: "No se obtuvieron resultados", from: "bot", type: "", previousQuestion: lastQuestion.previousQuestion })
            else
              this.messages.push({ id: 1, text: "Se produjo un error al realizar la petición", from: "bot", type: "", previousQuestion: lastQuestion.previousQuestion }) 
          }).add(()=>{
            this.messages.push(getQuestion(lastQuestion.previousQuestion, this.mockMessages))
            setTimeout(() => {
              this.scrollToBottom();
              this.loading = false;
            }, 0);
          });
        } else if (lastQuestion.type === "format"){
          // format
        }else{
          if (mensaje === "0" && lastQuestion.previousQuestion !== 1) {
            let prevQuestion = getQuestion(lastQuestion.previousQuestion, this.mockMessages)
            if (prevQuestion.type === "choices") {
              prevQuestion.text = getChoicesStr(prevQuestion.id, lastQuestion.previousQuestion !== 1 , this.mockChoices, this.mockMessages)
            }
            this.messages.push(prevQuestion);
          } else {
            this.messages.push({ id: 1, text: "No se pudo reconocer el dato ingresado", from: "bot", type: "", previousQuestion: null })
            this.messages.push(lastQuestion)
          }
        }
      }
    }
  }
}