import { Component, OnInit } from '@angular/core';
import { BhPolizaServiceService } from 'src/app/services/bh-poliza-service.service';
import { Choice } from './../../Choice';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Message } from './../../Message';

@Component({
  selector: 'app-settings-choices',
  templateUrl: './settings-choices.component.html',
  styleUrls: ['./settings-choices.component.css']
})
export class SettingsChoicesComponent implements OnInit {

  choices: Choice[] = [];
  dialogs: Message[] = [];
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
    this.polizaService.getQuestions("https://localhost:7247/Dialog").subscribe(value => {
      this.dialogs = value;
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
        this.polizaService.deleteChoice(id).subscribe(() => {
          this.getDataChoice();
          Swal.fire(
            'Eliminado!',
            'Se eliminó el elemento correctamente',
            'success'
          )
        })
      }
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