import {Component} from "@angular/core";
import {Router, RouterLink, RouterLinkActive} from "@angular/router";
import {AuthService} from "../usuarios/auth.service";
import {NgIf} from "@angular/common";
import swal from "sweetalert2";


@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    imports: [
      RouterLink,
      RouterLinkActive,
      NgIf
    ],
    standalone: true
  }
)
export class HeaderComponent {
  title = 'DMAPP';

  constructor(protected authService: AuthService, private router: Router) {
  }

  logOut(): void {
    swal.fire('Logout', `¡Hola ${this.authService.usuario.username}, has cerrado sesion con éxito`, 'success');
    this.authService.logOut();
    this.router.navigate(['/login']);
  }
}
