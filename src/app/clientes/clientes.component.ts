import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente";
import {DatePipe, NgForOf, NgIf, UpperCasePipe} from "@angular/common";
import {ClienteService} from "./cliente.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import Swal from "sweetalert2";
import {PaginatorComponent} from "../paginator/paginator.component";
import {IPagina} from "../paginator/paginator.models";

@Component({
  selector: 'app-clientes',
  standalone: true,
  templateUrl: './clientes.component.html',
  imports: [
    NgForOf,
    RouterLink,
    NgIf,
    UpperCasePipe,
    DatePipe,
    PaginatorComponent
  ]
})
export class ClientesComponent implements OnInit {

  clientes: Cliente[];
  paginador: IPagina;

  constructor(
    private clienteService: ClienteService,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      let page: number = +params.get('page');
      if (!page) {
        page = 0;
      }
      this.clienteService.getClientes(page)
        .subscribe(response => {
          this.clientes = response.content as Cliente[];
          this.paginador = response;
        });
    });
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
