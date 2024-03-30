import {Component, OnInit} from '@angular/core';
import {Usuario} from "./usuario";
import swal from 'sweetalert2';
import {FormsModule} from "@angular/forms";
import {AuthService} from "./auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  titulo = 'Iniciar sesión';
  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit() {
  }

  login() {
    console.log(this.usuario);
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Username o password vacias!', 'error')
      return;
    }

    this.authService.login(this.usuario).subscribe(
      () => {
        this.router.navigate(['/clientes']);
        swal.fire('Login', `Hola ${this.usuario.username}, has iniciado sesión con éxito`, 'success');
      }
    );
  }
}
