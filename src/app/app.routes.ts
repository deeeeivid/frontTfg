import {Routes} from '@angular/router';
import {DirectivaComponent} from "./directiva/directiva.component";
import {ClientesComponent} from "./clientes/clientes.component";
import {FormComponent} from "./clientes/form.component";
import {LoginComponent} from "./usuarios/login.component";
import {AuthGuard} from "./usuarios/guards/auth.guard";

export const routes: Routes = [
  {path: '', redirectTo: '/clientes', pathMatch: 'full'},
  {path: 'directivas', component: DirectivaComponent},
  {path: 'clientes', component: ClientesComponent},
  {path: 'clientes/page/:page', component: ClientesComponent},
  {path: 'clientes/form', component: FormComponent, canActivate: [AuthGuard]},
  {path: 'clientes/form/:id', component: FormComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
];
