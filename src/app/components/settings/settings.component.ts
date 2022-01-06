import { Component, OnInit } from '@angular/core';
import { BhPolizaServiceService } from 'src/app/services/bh-poliza-service.service';
import { Choice } from './../../Choice';
import { Message } from './../../Message';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  dialogs: Message[] = [];
  choices: Choice[] = [];
  DialogForm: FormGroup;
  ChoiceForm: FormGroup;
  submitted = false;
  EventValueDialog: any = "Guardar";
  EventValueChoice: any = "Guardar";

  constructor(private polizaService: BhPolizaServiceService) { 
    
  }

  ngOnInit(): void {
    this.getDataDialog();
    this.getDataChoice();

    this.DialogForm = new FormGroup({
      id: new FormControl(null),
      text: new FormControl(""),
      type: new FormControl("", [Validators.required]),
      previousQuestion: new FormControl(""),
      url: new FormControl(""),
    })
    this.ChoiceForm = new FormGroup({
      id: new FormControl(null, [Validators.required]),
      text: new FormControl("", [Validators.required]),
      question: new FormControl("", [Validators.required]),
      nextQuestion: new FormControl("", [Validators.required]),
      option: new FormControl("", [Validators.required]),
    })
  }

  getDataDialog(){
    this.polizaService.getQuestions("https://localhost:7247/Dialog").subscribe(value => {
      this.dialogs = value;
    })
  }

  editDataDialog(Data){
    this.DialogForm.controls["id"].setValue(Data.id);
    this.DialogForm.controls["text"].setValue(Data.text);
    this.DialogForm.controls["type"].setValue(Data.type);
    this.DialogForm.controls["previousQuestion"].setValue(Data.previousQuestion);
    this.DialogForm.controls["url"].setValue(Data.url);
    this.EventValueDialog = "Actualizar";
  }

  deleteDataDialog(id){
    this.polizaService.deleteDialog(id).subscribe(() => {
      this.getDataDialog();
    })
  }

  resetFormDialog() {
    this.getDataDialog();
    this.DialogForm.reset();
    this.EventValueDialog = "Save";
    this.submitted = false;
  }

  GuardarDialog() {
    this.submitted = true;

    if (this.DialogForm.invalid) {
      console.log(this.DialogForm);
      return;
    }
    delete this.DialogForm.value.id;
    this.polizaService.postDialog(this.DialogForm.value).subscribe((data) => {
      this.resetFormDialog();
    })
    
    
  }
  ActualizarDialog() {
    this.submitted = true;

    if (this.DialogForm.invalid) {
      return;
    }
    this.polizaService.putDialog(this.DialogForm.value.id, this.DialogForm.value).subscribe((data: any) => {
      this.resetFormChoice();
    })
  }

  getDataChoice(){
    this.polizaService.getChoices("https://localhost:7247/Choice").subscribe(value => {
      this.choices = value;
    })
  }

  editDataChoice(Data){
    this.ChoiceForm.controls["id"].setValue(Data.id);
    this.ChoiceForm.controls["text"].setValue(Data.text);
    this.ChoiceForm.controls["question"].setValue(Data.question);
    this.ChoiceForm.controls["nextQuestion"].setValue(Data.nextQuestion);
    this.ChoiceForm.controls["option"].setValue(Data.option);
    this.EventValueDialog = "Actualizar";
  }

  deleteDataChoice(id){
    this.polizaService.deleteDialog(id).subscribe(() => {
      this.getDataChoice();
    })
  }

  resetFormChoice() {
    this.getDataChoice();
    this.ChoiceForm.reset();
    this.EventValueDialog = "Save";
    this.submitted = false;
  }

  SaveChoice() {
    this.submitted = true;

    if (this.ChoiceForm.invalid) {
      return;
    }
    delete this.ChoiceForm.value.id;
    this.polizaService.postDialog(this.ChoiceForm.value).subscribe((data) => {
      this.resetFormChoice();
    })
    
    
  }
  ActualizarChoice() {
    this.submitted = true;

    if (this.ChoiceForm.invalid) {
      return;
    }
    this.polizaService.putDialog(this.ChoiceForm.value.id, this.ChoiceForm.value).subscribe((data: any) => {
      this.resetFormChoice();
    })
  }
  
}