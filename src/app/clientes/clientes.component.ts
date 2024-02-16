import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente";
import {NgForOf} from "@angular/common";
import {ClienteService} from "./cliente.service";

@Component({
  selector: 'app-clientes',
  standalone: true,
  templateUrl: './clientes.component.html',
  imports: [
    NgForOf
  ]
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.clientes = this.clienteService.getClientes();
  }

}
