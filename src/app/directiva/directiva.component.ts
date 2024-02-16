import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-directiva',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {
  listaCurso = ['TypeScript', 'JavaScript', 'Java', 'C#', 'PHP'];
  habilitar = true;

  setHabilitar(){
    this.habilitar = (this.habilitar != true);
  }
}
