import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usuario} from "./usuario";
import {Observable} from "rxjs";
import {UsuarioService} from "./usuario.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndpoint = 'http://localhost:8080/auth/generateToken';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'});
  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient, private userService: UsuarioService) {
  }

  public get usuario(): Usuario {
    if (this._usuario != null) {
      return this._usuario;
    } else if (this._usuario == null && sessionStorage.getItem('usuario') != null) {
      this._usuario = JSON.parse(sessionStorage.getItem('usuario')) as Usuario;
      return this._usuario;
    }
    return new Usuario();
  }

  public get token(): string {
    if (this._token != null) {
      return this._token;
    } else if (this._token == null && sessionStorage.getItem('token') != null) {
      this._token = sessionStorage.getItem('token');
      return this._token;
    }
    return null;
  }

  login(usuario: Usuario): Observable<any> {
    return this.http.post(this.urlEndpoint, usuario, {headers: this.httpHeaders});
  }

  guardarUsuario(accessToken: string): void {
    let payload = this.obtenerDatosToken(accessToken);
    this.userService.getUsuario(payload.sub).subscribe((usuario) => {
      this._usuario = usuario;
      sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
    });
  }

  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }

  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split(".")[1]))
    }
    return null;
  }
}
