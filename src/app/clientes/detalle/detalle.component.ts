import {Component, OnInit} from '@angular/core';
import {Cliente} from "../cliente";
import {ClienteService} from "../cliente.service";
import {ActivatedRoute} from "@angular/router";
import swal from "sweetalert2";
import {DatePipe, NgIf} from "@angular/common";

@Component({
  selector: 'detalle-cliente',
  standalone: true,
  imports: [
    DatePipe,
    NgIf
  ],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {

  cliente: Cliente;
  titulo: string = "Detalle del cliente";

  protected fotoSeleccionada: File;

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

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
    if (this.fotoSeleccionada.type.indexOf('image') < 0) {
      swal.fire('Error al seleccionar imagen: ', 'El archivo debe ser del tipo imagen', 'error');
      this.fotoSeleccionada = null;
    }
  }

  subirFoto() {
    if (!this.fotoSeleccionada) {
      swal.fire('Error de Subida: ', 'Debe seleccionar una foto', 'error');
    } else {
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(cliente => {
        this.cliente = cliente;
        swal.fire('La foto se ha subido correctamente.', `La foto se ha subido con éxito: ${this.cliente.foto}`, 'success');
      })
    }
  }
}
