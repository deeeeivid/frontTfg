import {Component, OnInit} from '@angular/core';
import {Factura} from "./models/factura";
import {ClienteService} from "../clientes/cliente.service";
import {ActivatedRoute, RouterLink} from "@angular/router";
import {AsyncPipe, NgForOf, NgIf} from "@angular/common";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {
  MatAutocomplete,
  MatAutocompleteSelectedEvent,
  MatAutocompleteTrigger,
  MatOption
} from "@angular/material/autocomplete";
import {MatFormField} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {flatMap, map, Observable} from "rxjs";
import {FacturaService} from "./services/factura.service";
import {Producto} from "./models/producto";
import {ItemFactura} from "./models/item-factura";

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

  seleccionarProducto(event: MatAutocompleteSelectedEvent): void {
    let producto = event.option.value as Producto;
    console.log(producto);

    if (this.existeItem(producto.id)) {
      this.incrementaCantidad(producto.id);
    } else {
      let nuevoItem = new ItemFactura();
      nuevoItem.producto = producto;
      this.factura.items.push(nuevoItem);
    }

    this.autocomplete.setValue('');
    event.option.focus();
    event.option.deselect();
  }

  actualizarCantidad(id: number, event: any): void {
    let cantidad = event.target.value as number;

    if (cantidad == 0) {
      return this.eliminarItemFactura(id);
    }

    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        item.cantidad = cantidad;
      }
      return item;
    });
  }

  existeItem(id: number): boolean {
    let existe = false;
    this.factura.items.forEach((item: ItemFactura) => {
      if (id === item.producto.id) {
        existe = true;
      }
    });
    return existe;
  }

  incrementaCantidad(id: number): void {
    this.factura.items = this.factura.items.map((item: ItemFactura) => {
      if (id === item.producto.id) {
        ++item.cantidad;
      }
      return item;
    });
  }

  eliminarItemFactura(id: number) {
    this.factura.items = this.factura.items.filter((item: ItemFactura) => id != item.producto.id);
  }
}
