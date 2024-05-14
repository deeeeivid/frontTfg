import {Injectable} from '@angular/core';
import {catchError, map, Observable, throwError} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {ReservaPendiente} from "./models/reserva-pendiente";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ReservaPendienteService {

  private urlEndpoint = 'http://localhost:8080/api/reservas';

  constructor(
    private http: HttpClient,
    private router: Router) {
  }

  getReservasPendientes(page: number): Observable<any> {
    return this.http.get(this.urlEndpoint + '/pendientes/page/' + page);
  }

  getReservaPendiente(id): Observable<ReservaPendiente> {
    return this.http.get<ReservaPendiente>(`${this.urlEndpoint}/pendientes/${id}`).pipe(
      catchError(e => {
        if (e.status != 401 && e.error.mensaje) {
          this.router.navigate(['/reservas']);
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

  crear(reserva: ReservaPendiente): Observable<ReservaPendiente> {
    return this.http.post(this.urlEndpoint, reserva).pipe(
      map((response: any) => response.reserva as ReservaPendiente));
  }

  eliminar(id: number): Observable<ReservaPendiente> {
    return this.http.delete<ReservaPendiente>(`${this.urlEndpoint}/pendientes/${id}`).pipe(
      catchError(e => {
        if (e.error.mensaje) {
          console.error(e.error.mensaje);
        }
        return throwError(e);
      })
    );
  }

}
