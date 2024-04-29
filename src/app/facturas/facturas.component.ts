import {Component, OnInit} from '@angular/core';
import {Factura} from "./models/factura";
import {ClienteService} from "../clientes/cliente.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {flatMap, map, Observable} from "rxjs";
import {FacturaService} from "./services/factura.service";
import {Producto} from "./models/producto";

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
  productosFiltrados: Observable<Producto[]>;

  constructor(
    private clienteService: ClienteService,
    private facturaService: FacturaService,
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
        map(value => typeof value === 'string' ? value : value.nombre),
        flatMap(value => value ? this._filter(value) : [])
      );
  }

  private _filter(value: string): Observable<Producto[]> {
    const filterValue = value.toLowerCase();
    return this.facturaService.filtrarProductos(filterValue);
  }

  mostrarNombre(producto?: Producto): string | undefined {
    return producto ? producto.nombre : undefined;
  }
}
