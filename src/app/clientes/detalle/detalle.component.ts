import {Component, Input, OnInit} from '@angular/core';
import {Cliente} from "../cliente";
import {ClienteService} from "../cliente.service";
import swal from "sweetalert2";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {HttpEventType} from "@angular/common/http";
import {ModalService} from "./modal.service";
import {AuthService} from "../../usuarios/auth.service";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'detalle-cliente',
  standalone: true,
  imports: [
    DatePipe,
    NgIf,
    NgStyle,
    NgForOf,
    RouterLink
  ],
  templateUrl: './detalle.component.html',
  styleUrl: './detalle.component.css'
})
export class DetalleComponent implements OnInit {

  @Input() cliente: Cliente;
  titulo: string = "Detalle del cliente";

  protected fotoSeleccionada: File;
  protected progreso = 0;

  constructor(
    private clienteService: ClienteService,
    protected authService: AuthService,
    protected modalService: ModalService) {
  }

  ngOnInit(): void {
  }

  seleccionarFoto(event) {
    this.fotoSeleccionada = event.target.files[0];
    this.progreso = 0;
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
      this.clienteService.subirFoto(this.fotoSeleccionada, this.cliente.id).subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          let response: any = event.body;
          this.cliente = response.cliente as Cliente;
          this.modalService.notificarUpload.emit(this.cliente);
          swal.fire('La foto se ha subido correctamente.', response.mensaje, 'success');
        }
      })
    }
  }

  cerrarModal() {
    this.modalService.cerrarModal();
    this.fotoSeleccionada = null;
    this.progreso = 0;
  }
}
