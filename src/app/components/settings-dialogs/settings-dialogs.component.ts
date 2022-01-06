import { Component, OnInit } from '@angular/core';
import { BhPolizaServiceService } from 'src/app/services/bh-poliza-service.service';
import { Message } from './../../Message';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'

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
    this.onChangeType(null);
  }

  deleteDataDialog(id) {
    Swal.fire({
      title: '¿Estás seguro que deseas eliminar este elemento?',
      text: "No lo podrás recuperar después.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar.'
    }).then((result) => {
      if (result.isConfirmed) {
        this.polizaService.deleteDialog(id).subscribe(() => {
          this.getDataDialog();
          this.resetFormDialog();
          Swal.fire(
            'Eliminado!',
            'Se eliminó el elemento correctamente',
            'success'
          );
        })
      }
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

  onChangeType(event: any){
    if (this.DialogForm.value.type === "message"){
      this.typeSelectChange(this.DialogForm, [], ['url','previousQuestion','format']);
    } else if (this.DialogForm.value.type === "input"){
      this.typeSelectChange(this.DialogForm, ['url','previousQuestion'], ['format']);
    } else if (this.DialogForm.value.type === "choices") {
      this.typeSelectChange(this.DialogForm, ['previousQuestion'], ['url','format']);
    }
  }

  typeSelectChange(form: FormGroup, enableFields: string[], disableFields: string[]){
    for (const efield of enableFields) {
      form.controls[efield].enable()
    }
    for (const dfield of disableFields) {
      form.controls[dfield].disable()
      form.controls[dfield].reset()
    }
  }

}