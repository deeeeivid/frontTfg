export class Reserva {
  id: number;
  nombre: string;
  apellido: string;
  fechaEvento: string;
  email: string;
  tipoEvento: TipoEvento;
  generoMusical: GeneroMusical[];
  rangoEdad: RangoEdad[];
  observacion: string;
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

