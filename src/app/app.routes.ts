import {Routes} from '@angular/router';
import {EventosComponent} from "./eventos/eventos.component";
import {ClientesComponent} from "./clientes/clientes.component";
import {FormComponent} from "./clientes/cliente-form/form.component";
import {LoginComponent} from "./usuarios/login.component";
import {RoleGuard} from "./usuarios/guards/role.guard";
import {AuthGuard} from "./usuarios/guards/auth.guard";
import {DetalleFacturaComponent} from "./facturas/detalle-factura/detalle-factura.component";
import {FacturasComponent} from "./facturas/facturas.component";
import {ReservaComponent} from "./reservas/form/reserva.component";
import {ReservasComponent} from "./reservas/reservas.component";
import {DetalleReservaComponent} from "./reservas/detalle-reserva/detalle-reserva.component";

export const routes: Routes = [
  {path: '', redirectTo: '/reserva', pathMatch: 'full'},
  {path: 'eventos', component: EventosComponent},
  {path: 'reserva', component: ReservaComponent,},
  {path: 'reservas', component: ReservasComponent},
  {path: 'reservas/page/:page', component: ReservasComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'clientes/form',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_ADMIN'}
  },
  {
    path: 'clientes/form/:id',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_ADMIN'}
  },
  {
    path: 'facturas/:id',
    component: DetalleFacturaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_USER'}
  },
  {
    path: 'facturas/form/:clienteId',
    component: FacturasComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_ADMIN'}
  }, {
    path: 'reservas/:id',
    component: DetalleReservaComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_ADMIN'}
  }
];
