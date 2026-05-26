import { EstadoInmueble } from './enums';

export interface Inmueble {
  id: string;
  alias: string;
  tipoInmueble: string;
  direccion: string;
  ciudad: string;
  municipio: string;
  barrio: string;
  torre?: string;
  piso?: string;
  apartamento?: string;
  matriculaInmobiliaria?: string;
  chipCatastral?: string;
  valorComercial?: number;
  valorCatastral?: number;
  fechaAdquisicion?: string;
  fotoPrincipal?: string;
  estado: EstadoInmueble;
  createdAt: string;
  updatedAt: string;
}
