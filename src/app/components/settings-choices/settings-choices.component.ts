import { Component, OnInit } from '@angular/core';
import { BhPolizaServiceService } from 'src/app/services/bh-poliza-service.service';
import { Choice, Message } from '../bharatrpatil-chat/bharatrpatil-chat.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-choices',
  templateUrl: './settings-choices.component.html',
  styleUrls: ['./settings-choices.component.css']
})
export class SettingsChoicesComponent implements OnInit {

  choices: Choice[] = [];
  ChoiceForm: FormGroup;
  submitted = false;
  EventValueChoice: any = "Guardar";

  constructor(private polizaService: BhPolizaServiceService) {

  }

  ngOnInit(): void {
    this.getDataChoice();

    this.ChoiceForm = new FormGroup({
      id: new FormControl(null),
      text: new FormControl("", [Validators.required]),
      question: new FormControl("", [Validators.required]),
      nextQuestion: new FormControl("", [Validators.required]),
      option: new FormControl("", [Validators.required]),
    })
  }

  getDataChoice() {
    this.polizaService.getChoices("https://localhost:7247/Choice").subscribe(value => {
      this.choices = value;
    })
  }

  editDataChoice(Data) {
    this.ChoiceForm.controls["id"].setValue(Data.id);
    this.ChoiceForm.controls["text"].setValue(Data.text);
    this.ChoiceForm.controls["question"].setValue(Data.question);
    this.ChoiceForm.controls["nextQuestion"].setValue(Data.nextQuestion);
    this.ChoiceForm.controls["option"].setValue(Data.option);
    this.EventValueChoice = "Actualizar";
  }

  deleteDataChoice(id) {
    this.polizaService.deleteChoice(id).subscribe(() => {
      this.getDataChoice();
    })
  }

  resetFormChoice() {
    this.getDataChoice();
    this.ChoiceForm.reset();
    this.EventValueChoice = "Guardar";
    this.submitted = false;
  }

  Guardar() {
    this.submitted = true;

    if (this.ChoiceForm.invalid) {
      return;
    }
    
    delete this.ChoiceForm.value.id;
    console.log(this.ChoiceForm.value);
    this.polizaService.postChoice(this.ChoiceForm.value).subscribe((data) => {
      this.resetFormChoice();
    })


  }
  Actualizar() {
    this.submitted = true;

    if (this.ChoiceForm.invalid) {
      return;
    }
    this.polizaService.putChoice(this.ChoiceForm.value.id, this.ChoiceForm.value).subscribe((data: any) => {
      this.resetFormChoice();
    })
  }

}