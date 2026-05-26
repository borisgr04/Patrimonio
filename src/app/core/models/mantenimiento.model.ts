import { EstadoMantenimiento } from './enums';

export interface Mantenimiento {
  id: string;
  inmuebleId: string;
  fechaMantenimiento: string;
  tipoMantenimiento: string;
  descripcion: string;
  proveedor: string;
  telefonoProveedor?: string;
  costoTotal: number;
  estado: EstadoMantenimiento;
  fotoAntes?: string;
  fotoDespues?: string;
  createdAt: string;
  updatedAt: string;
}
