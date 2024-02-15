import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-directiva',
  standalone: true,
  imports: [
    NgForOf
  ],
  templateUrl: './directiva.component.html'
})
export class DirectivaComponent {
  listaCurso = ['TypeScript', 'JavaScript', 'Java', 'C#', 'PHP'];
}
