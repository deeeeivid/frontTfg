export class Usuario {
  id: number;
  username: string;
  password: string;
  nombre: string;
  apellido: string
  email: string
  roles: IRole[] = []
}


export class IRole {
  id: number;
  nombre: string;
}
