import { Component, OnInit } from '@angular/core';
import { BhPolizaServiceService } from 'src/app/services/bh-poliza-service.service';
import { Choice, Message } from '../bharatrpatil-chat/bharatrpatil-chat.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-settings-dialogs',
  templateUrl: './settings-dialogs.component.html',
  styleUrls: ['./settings-dialogs.component.css']
})
export class SettingsDialogsComponent implements OnInit {

  dialogs: Message[] = [];
  DialogForm: FormGroup;
  submitted = false;
  EventValueDialog: any = "Guardar";

  constructor(private polizaService: BhPolizaServiceService) {

  }

  ngOnInit(): void {
    this.getDataDialog();

    this.DialogForm = new FormGroup({
      id: new FormControl(null),
      text: new FormControl(""),
      type: new FormControl("", [Validators.required]),
      previousQuestion: new FormControl(""),
      url: new FormControl(""),
      format: new FormControl(""),
    });
  }

  getDataDialog() {
    this.polizaService.getQuestions("https://localhost:7247/Dialog").subscribe(value => {
      this.dialogs = value;
    })
  }

  editDataDialog(Data) {
    this.DialogForm.controls["id"].setValue(Data.id);
    this.DialogForm.controls["text"].setValue(Data.text);
    this.DialogForm.controls["type"].setValue(Data.type);
    this.DialogForm.controls["previousQuestion"].setValue(Data.previousQuestion);
    this.DialogForm.controls["url"].setValue(Data.url);
    this.DialogForm.controls["format"].setValue(Data.format);
    this.EventValueDialog = "Actualizar";
  }

  deleteDataDialog(id) {
    this.polizaService.deleteDialog(id).subscribe(() => {
      this.getDataDialog();
    })
  }

  resetFormDialog() {
    this.getDataDialog();
    this.DialogForm.reset();
    this.EventValueDialog = "Guardar";
    this.submitted = false;
  }

  Guardar() {
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
  Actualizar() {
    this.submitted = true;

    if (this.DialogForm.invalid) {
      return;
    }
    this.polizaService.putDialog(this.DialogForm.value.id, this.DialogForm.value).subscribe((data: any) => {
      this.resetFormDialog();
    })
  }

}