import { Component, OnInit } from '@angular/core';
import { Ob1PersonasService } from 'src/app/services/ob1-personas.service';

@Component({
  selector: 'app-ob1-navbar',
  templateUrl: './ob1-navbar.component.html',
  styleUrls: ['./ob1-navbar.component.css']
})
export class Ob1NavbarComponent implements OnInit {

  numPersonas: number = 0;

  constructor(private personasService: Ob1PersonasService) { }

  ngOnInit(): void {
    this.personasService.getPersonas$().subscribe(
      personas => {
        this.numPersonas = personas.length
      }
    )
  }

}
