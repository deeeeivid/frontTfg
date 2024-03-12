import {Component, Input, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {IPagina} from "./paginator.models";

@Component({
  selector: 'paginator-nav',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './paginator.component.html'
})
export class PaginatorComponent implements OnInit {

  @Input() paginador: IPagina;
  paginas: number[];

  constructor() {
  }

  ngOnInit(): void {
    this.paginas = new Array(this.paginador.totalPages).fill(0).map((_valor, indice) => indice + 1);
  }

  protected readonly length = length;
}
