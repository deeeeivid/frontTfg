import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {Reserva} from "../models/reserva";
import {ReservaService} from "../reserva.service";

@Component({
  selector: 'app-detalle-reserva',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './detalle-reserva.component.html'
})
export class DetalleReservaComponent implements OnInit {

  reserva: Reserva;
  titulo = 'Reserva';

  constructor(private reservaService: ReservaService, private activatedroute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.reservaService.getReserva(id).subscribe(reserva => this.reserva = reserva);
    })
  }

}
