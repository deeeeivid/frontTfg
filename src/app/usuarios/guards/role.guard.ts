import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Injectable} from "@angular/core";
import {AuthService} from "../auth.service";
import {Observable} from "rxjs";
import swal from "sweetalert2";

@Injectable({providedIn: 'root'})
export class RoleGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['/login']);
      return false;
    }

    let role = next.data['role'] as string;
    console.log(role);
    if (this.authService.hasRole(role)) {
      return true;
    }

    swal.fire('Acceso denegado', `Hola ${this.authService.usuario.username}, no tienes acceso a este recurso!`, 'warning');
    this.router.navigate(['/clientes']);
    return false;
  }


}
