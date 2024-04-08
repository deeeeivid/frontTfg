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
    if (this.authService.isAuthenticated()) {
      swal.fire('Login', `¡Hola ${this.authService.usuario.username}, ya estas autenticado!`, 'info');
      this.router.navigate(['/clientes']);
    }
  }

  login() {
    if (this.usuario.username == null || this.usuario.password == null) {
      swal.fire('Error Login', 'Username o password vacias!', 'error')
      return;
    }

    this.authService.login(this.usuario).subscribe(
      response => {
        this.router.navigate(['/clientes']);
        this.authService.guardarSessionStorage(response.accessToken);
      },
      error => {
        if (error.status == 401 || error.status == 403) {
          swal.fire('Error Login', `Usuario o clave incorrecta`, 'error');
        }
      }
    );

  }
}
