import { Component, OnInit } from '@angular/core';
import { Ob1PersonasService, Persona } from 'src/app/services/ob1-personas.service';

@Component({
  selector: 'app-ob1-lista',
  templateUrl: './ob1-lista.component.html',
  styleUrls: ['./ob1-lista.component.css']
})
export class Ob1ListaComponent implements OnInit {

  arrPersonas: Persona[];
  constructor(
    private personaService: Ob1PersonasService
  ) { }

  ngOnInit(): void {
    this.personaService.getPersonas$().subscribe(personas => {
      this.arrPersonas = personas
    })
  }

}
