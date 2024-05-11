import {Component, OnInit} from '@angular/core';
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import swal from "sweetalert2";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSuffix} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {GeneroMusical, RangoEdad, Reserva, TipoEvento} from "../models/reserva";
import {ReservaService} from "../reserva.service";

@Component({
  selector: 'app-reservas',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    DatePipe,
    NgStyle,
    RouterLink,
    MatDatepickerToggle,
    MatDatepicker,
    ReactiveFormsModule,
    FormsModule,
    MatDatepickerInput,
    MatSuffix,
    MatInput
  ],
  templateUrl: './reserva.component.html'
})
export class ReservaComponent implements OnInit {

  public titulo = "Nueva Reserva";
  public reserva = new Reserva();
  public tipos: TipoEvento[];
  public generos: GeneroMusical[];
  public rangos: RangoEdad[];
  public errores: string[];

  constructor(
    private reservaService: ReservaService,
    private activatedRoute: ActivatedRoute,
    private router: Router) {

  }

  ngOnInit(): void {
    this.cargarReserva();
    this.cargarTipoEventos();
    this.cargarGenerosMusicales();
    this.cargarRangoEdades();
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

  cargarTipoEventos() {
    this.reservaService.getTipoEventos().subscribe(tipos => {
      this.tipos = tipos;
    });
  }

  cargarGenerosMusicales() {
    this.reservaService.getGenerosMusicales().subscribe(generos => {
      this.generos = generos;
    });
  }

  cargarRangoEdades() {
    this.reservaService.getRangoEdades().subscribe(rangos => {
      this.rangos = rangos;
    });
  }

  create(): void {
    this.reservaService.create(this.reserva).subscribe(
      reserva => {
        this.router.navigate(['/reservas'])
        swal.fire('Nueva reserva', `La reserva ha sido creada con éxito!`, 'success')
      },
      error => {
        this.errores = error.error.errors as string[];
        console.error('Codigo del error ' + error.status);
        console.error(error.error.errors);
      });
  }

  compararTipoEvento(o1: TipoEvento, o2: TipoEvento): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  compararGeneroMusical(o1: GeneroMusical, o2: GeneroMusical): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  compararRangoEdad(o1: RangoEdad, o2: RangoEdad): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }
    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }
}
