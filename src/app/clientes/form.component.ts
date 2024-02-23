import {Component, OnInit} from '@angular/core';
import {Cliente} from "./cliente";
import {FormsModule} from "@angular/forms";

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

  constructor() {
  }

  ngOnInit(): void {
  }

  public create(): void {
    console.log("clicked!");
    console.log(this.cliente);
  }

}
