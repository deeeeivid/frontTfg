import {Component, OnInit} from '@angular/core';
import {Cliente} from "../cliente";
import {ClienteService} from "../cliente.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'detalle-cliente',
  standalone: true,
  imports: [],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {

  cliente: Cliente;
  titulo: string = "Detalle del cliente";

  constructor(
    private clienteService: ClienteService,
    private acivatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.acivatedRoute.paramMap.subscribe(params => {
      let id: number = +params.get('id');
      if (id) {
        this.clienteService.getCliente(id).subscribe(cliente => {
          this.cliente = cliente;
        })
      }
    })
  }

}
