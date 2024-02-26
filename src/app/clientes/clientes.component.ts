import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente";
import {NgForOf} from "@angular/common";
import {ClienteService} from "./cliente.service";
import {RouterLink} from "@angular/router";
import Swal from "sweetalert2";

@Component({
  selector: 'app-clientes',
  standalone: true,
  templateUrl: './clientes.component.html',
  imports: [
    NgForOf,
    RouterLink
  ]
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];

  constructor(
    private clienteService: ClienteService) {
  }

  ngOnInit() {
    this.clienteService.getClientes().subscribe(
      clientes =>
        this.clientes = clientes
    );
  }

  delete(cliente: Cliente) {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger"
      },
      buttonsStyling: false
    });
    swalWithBootstrapButtons.fire({
      title: "¿Estás seguro?",
      text: `¿Seguro que desea eliminar al cliente ${cliente.nombre} ${cliente.apellido}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.clienteService.delete(cliente.id).subscribe(() => {
          this.clientes = this.clientes.filter(cli => cli !== cliente);
          Swal.fire({
            title: "Cliente eliminado!",
            text: `Cliente ${cliente.nombre}  ${cliente.apellido} eliminado con éxito.`,
            icon: "success"
          });
        })

      }
    });
  }

}
