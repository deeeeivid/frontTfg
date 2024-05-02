import {Component, OnInit} from '@angular/core';
import {FacturaService} from "../services/factura.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {Factura} from "../models/factura";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-detalle-factura',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './detalle-factura.component.html'
})
export class DetalleFacturaComponent implements OnInit {

  factura: Factura;
  titulo = 'Factura';

  constructor(private facturaService: FacturaService, private activatedroute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.facturaService.getFactura(id).subscribe(factura => this.factura = factura);
    })
  }

}
