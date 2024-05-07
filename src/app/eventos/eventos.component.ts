import {Component} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-directiva',
  standalone: true,
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './eventos.component.html'
})
export class EventosComponent {
  eventos = ['Boda Torreon El Pardo','Klandestino Ibiza', 'Batán', 'Aravaca', 'Hacke Club', 'Independance Club', 'Sala On', 'Quinns', 'Island',
    'Rita La Cantaora', 'Ego Club', 'Comunion Parla'];
  habilitar = true;

  setHabilitar() {
    // Si habilitar es false, entonces true y viceversa
    this.habilitar = (this.habilitar != true);
  }
}
