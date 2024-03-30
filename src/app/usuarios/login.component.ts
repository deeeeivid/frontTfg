import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo = 'Iniciar sesión';

  constructor() {
  }

  ngOnInit() {
  }
}
