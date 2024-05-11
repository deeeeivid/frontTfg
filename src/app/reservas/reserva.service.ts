import {Injectable} from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {GeneroMusical, RangoEdad, Reserva, TipoEvento} from "./models/reserva";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ReservaService {

  private urlEndpoint = 'http://localhost:8080/api/reservas';

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  getReservas(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/page/' + page);
  }

  getReserva(id): Observable<Reserva> {
    return this.http.get<Reserva>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/reservas']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  create(reserva: Reserva): Observable<Reserva> {
    return this.http.post(this.urlEndpoint, reserva).pipe(
      map((response: any) => response.reserva as Reserva),
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  update(reserva: Reserva): Observable<any> {
    return this.http.put<any>(`${this.urlEndpoint}/${reserva.id}`, reserva).pipe(
      catchError(e => {

        if (e.status == 400) {
          return throwError(e);
        }

        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  delete(id: number): Observable<Reserva> {
    return this.http.delete<Reserva>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }

        return throwError(e);
      })
    );
  }

  getTipoEventos(): Observable<TipoEvento[]> {
    return this.http.get<TipoEvento[]>(this.urlEndpoint + '/tipos-eventos');
  }

  getGenerosMusicales(): Observable<GeneroMusical[]> {
    return this.http.get<GeneroMusical[]>(this.urlEndpoint + '/generos-musicales');
  }

  getRangoEdades(): Observable<RangoEdad[]> {
    return this.http.get<RangoEdad[]>(this.urlEndpoint + '/rango-edades');
  }
}
