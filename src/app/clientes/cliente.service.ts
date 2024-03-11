import {Injectable} from '@angular/core';
import {Cliente} from "./cliente";
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import swal from "sweetalert2";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private urlEndpoint = 'http://localhost:8080/api/clientes';
  private hhtpHeaders = new HttpHeaders({'Content-type': 'application/json'})

  constructor(
    private http: HttpClient,
    private router: Router
  ) {

  }

  getClientes(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/' + page);
  }

  create(cliente: Cliente): Observable<Cliente> {
    return this.http.post(this.urlEndpoint, cliente, {headers: this.hhtpHeaders}).pipe(
      map((response: any) => response.cliente as Cliente),
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getCliente(id): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        this.router.navigate(['/clientes']);
        console.error(e.error.mensaje);
        swal.fire('Error al editar', e.error.mensaje, 'error');
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${cliente.id}`, cliente, {headers: this.hhtpHeaders}).pipe(
      catchError(e => {
        if (e.status == 400) {
          return throwError(e);
        }
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.hhtpHeaders}).pipe(
      catchError(e => {
        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }
}
