import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Usuario} from "./usuario";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private urlEndpoint = 'http://localhost:8080/user/obtener';

  constructor(private http: HttpClient) {
  }

  getUsuario(username: string): Observable<Usuario> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("username", username);
    return this.http.get<Usuario>(this.urlEndpoint, {params: queryParams});
  }

}
