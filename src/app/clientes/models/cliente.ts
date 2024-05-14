import {Region} from "./region";
import {Factura} from "../../facturas/models/factura";

export class Cliente {
  id: number;
  nombre: string;
  apellido: string;
  fechaAlta: string;
  email: string;
  foto: string;
  region: Region;
  facturas: Factura[] = [];
}
