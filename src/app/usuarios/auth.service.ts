import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Usuario} from "./usuario";
import {Observable} from "rxjs";
import swal from "sweetalert2";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _usuario: Usuario;
  private _token: string;

  constructor(private http: HttpClient) {
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
    let urlEndpoint = 'http://localhost:8080/auth/generateToken';
    return this.http.post(urlEndpoint, usuario);
  }

  guardarSessionStorage(accessToken: string) {
    let payload = this.obtenerDatosToken(accessToken);
    this.guardarUsuario(payload, accessToken);
    this.guardarToken(accessToken);
    swal.fire('Login', `Hola ${payload.sub}, has iniciado sesión con éxito`, 'success');
  }

  guardarUsuario(payload: any, accessToken: string): void {
    let httpHeaders = new HttpHeaders();
    let urlEndpoint = "http://localhost:8080/user/obtener";
    let queryParams = new HttpParams();

    queryParams = queryParams.append("username", payload.sub);
    if (accessToken != null) {
      httpHeaders = httpHeaders.append('Authorization', 'Bearer ' + accessToken);
    }

    this.http.get<Usuario>(urlEndpoint, {headers: httpHeaders, params: queryParams})
      .subscribe((usuario) => {
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

  isAuthenticated(): boolean {
    let payload = this.obtenerDatosToken(this.token);
    return payload != null && payload.sub && payload.sub.length > 0;
  }

  hasRole(role: string): boolean {
    return this.usuario.roles.some(value => value.nombre === role);
  }

  logOut() {
    this._token = null;
    this._usuario = null;
    sessionStorage.clear();
  }
}
