import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente";
import {FormsModule} from "@angular/forms";
import {ClienteService} from "./cliente.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public cliente = new Cliente();
  public titulo = "Crear cliente";

  constructor(
    private clienteService: ClienteService,
    private router: Router) {

  }

  ngOnInit(): void {
  }

  public create(): void {
    this.clienteService.create(this.cliente).subscribe(
      () => this.router.navigate(['/clientes'])
    );
  }

}
