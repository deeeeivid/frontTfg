import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente";
import {FormsModule} from "@angular/forms";
import {ClienteService} from "./cliente.service";
import {ActivatedRoute, Router} from "@angular/router";
import swal from 'sweetalert2';
import {NgForOf, NgIf} from "@angular/common";
import {MatDatepicker, MatDatepickerInput, MatDatepickerToggle} from "@angular/material/datepicker";
import {MatFormField, MatHint, MatInput, MatSuffix} from "@angular/material/input";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    MatFormField,
    MatDatepickerToggle,
    MatDatepicker,
    MatInput,
    MatDatepickerInput,
    MatHint,
    MatSuffix,
  ],
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente = new Cliente();
  public titulo = "Crear cliente";
  public errores: string[];

  constructor(
    private clienteService: ClienteService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.cargarCliente();
  }

  cargarCliente(): void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        )
      }
    })
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      cliente => {
        this.router.navigate(['/clientes'])
        swal.fire('Nuevo cliente', `El cliente ${cliente.nombre} ha sido creado con éxito!`, 'success')
      },
      error => {
        this.errores = error.error.errors as string[];
        console.error('Codigo del error ' + error.status);
        console.error(error.error.errors);
      });
  }

  public update(): void {
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes'])
        swal.fire('Cliente actualizado', `${json.mensaje}: ${json.cliente.nombre}`, 'success')
      }, error => {
        this.errores = error.error.errors as string[];
        console.error('Codigo del error ' + error.status);
        console.error(error.error.errors);
      });
  }

}
