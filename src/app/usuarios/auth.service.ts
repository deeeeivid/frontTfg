import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Usuario} from "./usuario";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private urlEndpoint = 'http://localhost:8080/auth/generateToken';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})

  constructor(private http: HttpClient) {
  }

  login(usuario: Usuario) {
    return this.http.post(this.urlEndpoint, usuario, {headers: this.httpHeaders});
  }
}
