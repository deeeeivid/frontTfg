import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente";
import {NgForOf} from "@angular/common";
import {CLIENTES} from "./clientes.json";

@Component({
  selector: 'app-clientes',
  standalone: true,
  templateUrl: './clientes.component.html',
  imports: [
    NgForOf
  ]
})
export class ClientesComponent implements OnInit{

  clientes: Cliente[];

  constructor() {
  }

  ngOnInit(){
    this.clientes = CLIENTES;
  }

}
