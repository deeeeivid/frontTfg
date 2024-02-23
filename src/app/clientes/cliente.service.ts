import {Injectable} from '@angular/core';
import {Cliente} from "./cliente";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint = 'http://localhost:8080/api/clientes';
  private hhtpHeaders = new HttpHeaders({'Content-type': 'application/json'})
  constructor(
    private http: HttpClient
  ) {

  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.urlEndpoint)
  }

  create(cliente: Cliente) : Observable<Cliente> {
    return this.http.post<Cliente>(this.urlEndpoint, cliente, {headers: this.hhtpHeaders})
  }
}
