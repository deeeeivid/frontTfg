import {Routes} from '@angular/router';
import {EventosComponent} from "./eventos/eventos.component";
import {ClientesComponent} from "./clientes/clientes.component";
import {FormComponent} from "./clientes/cliente-form/form.component";
import {LoginComponent} from "./usuarios/login.component";
import {RoleGuard} from "./usuarios/guards/role.guard";
import {AuthGuard} from "./usuarios/guards/auth.guard";
import {DetalleFacturaComponent} from "./facturas/detalle-factura/detalle-factura.component";
import {FacturasComponent} from "./facturas/facturas.component";
import {ReservasComponent} from "./reservas/reservas.component";

export const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'eventos', component: EventosComponent},
  {path: 'reservas', component: ReservasComponent},
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
  }
];
