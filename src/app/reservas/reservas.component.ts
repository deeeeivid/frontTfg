import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {IPagina} from "../paginator/paginator.models";
import {AuthService} from "../usuarios/auth.service";
import {Reserva} from "./models/reserva";
import {ReservaService} from "./reserva.service";
import Swal from "sweetalert2";
import {ModalService} from "../clientes/detalle/modal.service";
import {PaginatorComponent} from "../paginator-reservas/pag-reservas.component";

@Component({
  selector: 'app-reservas',
  standalone: true,
  templateUrl: './reservas.component.html',
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    UpperCasePipe,
    DatePipe,
    PaginatorComponent,
    PaginatorComponent,
  ]
})
export class ReservasComponent implements OnInit {

  public reserva = new Reserva();
  reservas: Reserva[];
  paginador: IPagina;

  constructor(
    private reservaService: ReservaService,
    public authService: AuthService,
    private router: Router,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.cargarReserva();
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.reservaService.getReservas(page)
        .subscribe(response => {
          this.reservas = response.content as Reserva[];
          this.paginador = response;
        });
    });
  }

  cargarReserva(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.reservaService.getReserva(id).subscribe(
          (reserva) => this.reserva = reserva
        )
      }
    });
  }

  eliminar(reserva: Reserva) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: `¿Seguro que desea eliminar la reserva #${reserva.id} hecha por ${reserva.nombre.toUpperCase()} el día ${reserva.fechaEvento} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.eliminar(reserva.id).subscribe(() => {
          this.reservas = this.reservas.filter(cli => cli !== reserva);
          Swal.fire({
            title: "Reserva eliminada!",
            text: `Reserva ${reserva.id} hecha por ${reserva.nombre}, eliminada con éxito.`,
            icon: "success"
          });
        })

      }
    });
  }

}
