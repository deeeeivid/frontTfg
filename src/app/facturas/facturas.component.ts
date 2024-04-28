import {Component, OnInit} from '@angular/core';
import {Factura} from "./models/factura";
import {ClienteService} from "../clientes/cliente.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    RouterLink
  ],
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {

  titulo = 'Nueva Factura'
  factura = new Factura();


  constructor(
    private clienteService: ClienteService,
    private activatedroute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(clienteId => this.factura.cliente = clienteId);
    });
  }
}
