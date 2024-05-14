export class ReservaPendiente {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  fechaEvento: string;
  ubicacion: string;
  observacion: string;
  tipoEvento: TipoEvento;
  generoMusical: GeneroMusical;
  rangoEdad: RangoEdad;
}

export class TipoEvento {
  id: string;
  nombre: string;
}

export class GeneroMusical {
  id: string;
  nombre: string;
}


export class RangoEdad {
  id: string;
  nombre: string;
}

