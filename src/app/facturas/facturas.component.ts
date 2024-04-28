import {Component, OnInit} from '@angular/core';
import {Factura} from "./models/factura";
import {ClienteService} from "../clientes/cliente.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-facturas',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    RouterLink,
    MatAutocompleteTrigger,
    MatAutocomplete,
    MatOption,
    MatFormField,
    ReactiveFormsModule,
    MatInput,
    NgForOf,
    AsyncPipe
  ],
  templateUrl: './facturas.component.html'
})
export class FacturasComponent implements OnInit {

  titulo = 'Nueva Factura'
  factura = new Factura();

  autocomplete = new FormControl();
  productos: string[] = ['Mesa', 'Silla', 'Toldo', 'Sony'];
  productosFiltrados: Observable<string[]>;

  constructor(
    private clienteService: ClienteService,
    private activatedroute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.activatedroute.paramMap.subscribe(params => {
      let clienteId = +params.get('clienteId');
      this.clienteService.getCliente(clienteId).subscribe(clienteId => this.factura.cliente = clienteId);
    });
    this.productosFiltrados = this.autocomplete.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.productos.filter(option => option.toLowerCase().includes(filterValue));
  }
}
