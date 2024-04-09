import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from "rxjs";
import {Injectable} from "@angular/core";
import {AuthService} from "../auth.service";

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean {
    if (this.authService.isAuthenticated()) {
      if (this.isTokenExpirado()) {
        this.authService.logOut();
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }

  isTokenExpirado(): boolean {
    let token = this.authService.token;
    let payload = this.authService.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    return payload.exp < now;
  }
}
