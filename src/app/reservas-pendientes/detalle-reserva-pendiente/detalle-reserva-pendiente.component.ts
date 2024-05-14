import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {ReservaPendiente} from "../models/reserva-pendiente";
import {ReservaPendienteService} from "../reserva-pendiente.service";

@Component({
  selector: 'app-detalle-reserva-pendiente',
  standalone: true,
  imports: [
    RouterLink,
    NgIf,
    NgForOf
  ],
  templateUrl: './detalle-reserva-pendiente.component.html'
})
export class DetalleReservaPendienteComponent implements OnInit {

  reservaPendiente: ReservaPendiente;
  titulo = 'Reserva Pendiente';

  constructor(private reservaService: ReservaPendienteService, private activatedroute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      let id = +params.get('id');
      this.reservaService.getReservaPendiente(id).subscribe(reservaPendiente => this.reservaPendiente = reservaPendiente);
    })
  }

}
