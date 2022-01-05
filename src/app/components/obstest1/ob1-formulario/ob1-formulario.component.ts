import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Ob1PersonasService } from 'src/app/services/ob1-personas.service';

@Component({
  selector: 'app-ob1-formulario',
  templateUrl: './ob1-formulario.component.html',
  styleUrls: ['./ob1-formulario.component.css']
})
export class Ob1FormularioComponent implements OnInit {

  formulario: FormGroup;

  constructor(
    private personasService: Ob1PersonasService
  ) { 
    this.formulario = new FormGroup({
      nombre: new FormControl(),
      apellidos: new FormControl(),
      empresa: new FormControl(),
      telefono: new FormControl(),
      email: new FormControl(),
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){
    this.personasService.agregarPersona(this.formulario.value);
  }

}
