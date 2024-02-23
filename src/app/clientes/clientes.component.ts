import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente";
import {NgForOf} from "@angular/common";
import {ClienteService} from "./cliente.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-clientes',
  standalone: true,
  templateUrl: './clientes.component.html',
  imports: [
    NgForOf,
    RouterLink
  ]
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes =>
        this.clientes = clientes
    );
  }

}
