import {Component, Input, OnInit} from '@angular/core';
import {Cliente} from "../models/cliente";
import {ClienteService} from "../cliente.service";
import swal from "sweetalert2";
import Swal from "sweetalert2";
import {DatePipe, NgForOf, NgIf, NgStyle} from "@angular/common";
import {HttpEventType} from "@angular/common/http";
import {ModalService} from "./modal.service";
import {AuthService} from "../../usuarios/auth.service";
import {RouterLink} from "@angular/router";
import {FacturaService} from "../../facturas/services/factura.service";
import {Factura} from "../../facturas/models/factura";

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
    protected facturaService: FacturaService,
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

  delete(factura: Factura): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: `¿Seguro que desea eliminar la factura: ${factura.descripcion}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.facturaService.delete(factura.id).subscribe(() => {
          this.cliente.facturas = this.cliente.facturas.filter(f => f !== factura);
          Swal.fire({
            title: "Factura eliminado!",
            text: `Factura: ${factura.descripcion}" eliminado con éxito.`,
            icon: "success"
          });
        })
      }
    });
  }
}
