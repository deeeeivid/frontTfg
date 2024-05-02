import {Routes} from '@angular/router';
import {DirectivaComponent} from "./directiva/directiva.component";
import {ClientesComponent} from "./clientes/clientes.component";
import {FormComponent} from "./clientes/form.component";
import {LoginComponent} from "./usuarios/login.component";
import {RoleGuard} from "./usuarios/guards/role.guard";
import {AuthGuard} from "./usuarios/guards/auth.guard";
import {DetalleFacturaComponent} from "./facturas/detalle-factura/detalle-factura.component";
import {FacturasComponent} from "./facturas/facturas.component";

export const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard, RoleGuard], data: {role: 'ROLE_ADMIN'}},
  {
    path: 'clientes/form/:id',
    component: FormComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: {role: 'ROLE_ADMIN'}
  },
  {path: 'login', component: LoginComponent},
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
