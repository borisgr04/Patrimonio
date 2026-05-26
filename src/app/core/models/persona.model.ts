export interface Persona {
  id: string;
  nombres: string;
  apellidos: string;
  cedula: string;
  telefonoCelular: string;
  telefonoAlternativo?: string;
  correo: string;
  direccionResidencia: string;
  ciudad: string;
  empresaTrabajo?: string;
  cargo?: string;
  telefonoEmpresa?: string;
  ingresosMensuales?: number;
  fotoDocumento?: string;
  createdAt: string;
  updatedAt: string;
}
