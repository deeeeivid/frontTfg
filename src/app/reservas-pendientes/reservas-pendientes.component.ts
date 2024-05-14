import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {IPagina} from "../paginator/paginator.models";
import {AuthService} from "../usuarios/auth.service";
import {ReservaPendiente} from "./models/reserva-pendiente";
import {ReservaPendienteService} from "./reserva-pendiente.service";
import Swal from "sweetalert2";
import swal from "sweetalert2";
import {ModalService} from "../clientes/detalle/modal.service";
import {PaginatorComponent} from "../paginator-reservas/pag-reservas.component";

@Component({
  selector: 'app-reservas',
  standalone: true,
  templateUrl: './reservas-pendientes.component.html',
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
export class ReservasPendientesComponent implements OnInit {

  public reservaPendiente = new ReservaPendiente();
  reservasPendientes: ReservaPendiente[];
  paginador: IPagina;

  constructor(
    private reservaService: ReservaPendienteService,
    public authService: AuthService,
    private router: Router,
    private modalService: ModalService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.reservaService.getReservasPendientes(page)
        .subscribe(response => {
          this.reservasPendientes = response.content as ReservaPendiente[];
          this.paginador = response;
        });
    });
  }

  crearReserva(reservaEntry: ReservaPendiente): void {
    const reservaCopy = {...reservaEntry};
    this.reservaPendiente = reservaEntry;
    this.reservaPendiente.id = null;
    this.reservaService.crear(this.reservaPendiente).subscribe(
      reserva => {
        this.eliminarAlConfirmar(reservaCopy.id);
      });
  }


  eliminarAlConfirmar(id: number) {
    this.reservaService.eliminar(id).subscribe(
      () => {
        this.router.navigate(['/reservas'])
        swal.fire('Nueva reserva', `La reserva ha sido confirmada con éxito!`, 'success')
      }
      , error => console.error(error)
    )

  }

  eliminarReservaPendiente(reservaPendiente: ReservaPendiente) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: `¿Seguro que desea eliminar la reserva #${reservaPendiente.id} hecha por ${reservaPendiente.nombre.toUpperCase()} el día ${reservaPendiente.fechaEvento} ?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.reservaService.eliminar(reservaPendiente.id).subscribe(() => {
          this.reservasPendientes = this.reservasPendientes.filter(cli => cli !== reservaPendiente);
          Swal.fire({
            title: "Reserva eliminada!",
            text: `Reserva ${reservaPendiente.id} hecha por ${reservaPendiente.nombre}, eliminada con éxito.`,
            icon: "success"
          });
        })

      }
    });
  }
}
