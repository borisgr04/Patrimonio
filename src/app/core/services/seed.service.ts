import { Injectable, inject } from '@angular/core';
import { Contrato } from '../models/contrato.model';
import { Inmueble } from '../models/inmueble.model';
import { Mantenimiento } from '../models/mantenimiento.model';
import { Pago } from '../models/pago.model';
import { Persona } from '../models/persona.model';
import {
  EstadoContrato,
  EstadoInmueble,
  EstadoMantenimiento,
  MetodoPago,
  TipoContrato,
  TipoPago,
} from '../models/enums';
import { obtenerMesActual, sumarDias } from '../utils/date.util';
import { calcularCanonConIPC } from '../utils/ipc.util';
import { StorageService, STORAGE_KEYS } from './storage.service';

@Injectable({ providedIn: 'root' })
export class SeedService {
  private readonly storage = inject(StorageService);

  inicializar(): void {
    const seed = this.storage.getItem(STORAGE_KEYS.seed);
    if (seed.success && seed.data === 'true') {
      return;
    }

    const ahora = new Date();
    const now = ahora.toISOString();
    const mesActual = obtenerMesActual();
    const anio = ahora.getFullYear();
    const makeId = () => crypto.randomUUID();

    const inmuebles: Inmueble[] = [
      {
        id: makeId(),
        alias: 'Torre Central 402',
        tipoInmueble: 'Apartamento',
        direccion: 'Cra 45 #98-12',
        ciudad: 'Bogotá',
        municipio: 'Chapinero',
        barrio: 'Chicó',
        torre: 'A',
        piso: '4',
        apartamento: '402',
        matriculaInmobiliaria: '50C-123456',
        chipCatastral: 'AAA001',
        valorComercial: 420000000,
        valorCatastral: 280000000,
        fechaAdquisicion: `${anio - 4}-05-12`,
        estado: EstadoInmueble.ARRENDADO,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: makeId(),
        alias: 'Casa Prado',
        tipoInmueble: 'Casa',
        direccion: 'Calle 80 #52-30',
        ciudad: 'Medellín',
        municipio: 'Medellín',
        barrio: 'Prado Centro',
        valorComercial: 680000000,
        valorCatastral: 340000000,
        fechaAdquisicion: `${anio - 6}-02-01`,
        estado: EstadoInmueble.DISPONIBLE,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: makeId(),
        alias: 'Local Riviera',
        tipoInmueble: 'Local',
        direccion: 'Av 3N #49-12',
        ciudad: 'Cali',
        municipio: 'Cali',
        barrio: 'La Flora',
        valorComercial: 520000000,
        valorCatastral: 300000000,
        fechaAdquisicion: `${anio - 2}-09-18`,
        estado: EstadoInmueble.MANTENIMIENTO,
        createdAt: now,
        updatedAt: now,
      },
    ];

    const personas: Persona[] = [
      {
        id: makeId(),
        nombres: 'Laura',
        apellidos: 'Gómez',
        cedula: '10203040',
        telefonoCelular: '3001234567',
        correo: 'laura@example.com',
        direccionResidencia: 'Calle 127 #20-10',
        ciudad: 'Bogotá',
        empresaTrabajo: 'Tech SAS',
        cargo: 'Analista',
        telefonoEmpresa: '6015550101',
        ingresosMensuales: 6800000,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: makeId(),
        nombres: 'Carlos',
        apellidos: 'Ruiz',
        cedula: '90909090',
        telefonoCelular: '3012223344',
        correo: 'carlos@example.com',
        direccionResidencia: 'Cra 12 #34-90',
        ciudad: 'Bogotá',
        empresaTrabajo: 'Comercializadora CR',
        cargo: 'Gerente',
        telefonoEmpresa: '6015550202',
        ingresosMensuales: 9000000,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: makeId(),
        nombres: 'María',
        apellidos: 'Suárez',
        cedula: '80808080',
        telefonoCelular: '3104445566',
        correo: 'maria@example.com',
        direccionResidencia: 'Calle 7 #14-22',
        ciudad: 'Medellín',
        empresaTrabajo: 'Logística Andina',
        cargo: 'Coordinadora',
        telefonoEmpresa: '6045550101',
        ingresosMensuales: 5400000,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: makeId(),
        nombres: 'Andrés',
        apellidos: 'Pardo',
        cedula: '70707070',
        telefonoCelular: '3201112233',
        correo: 'andres@example.com',
        direccionResidencia: 'Calle 99 #8-88',
        ciudad: 'Bogotá',
        empresaTrabajo: 'Pardo Abogados',
        cargo: 'Abogado',
        telefonoEmpresa: '6015550303',
        ingresosMensuales: 11000000,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: makeId(),
        nombres: 'Sara',
        apellidos: 'López',
        cedula: '60606060',
        telefonoCelular: '3118887766',
        correo: 'sara@example.com',
        direccionResidencia: 'Carrera 72 #40-12',
        ciudad: 'Cali',
        empresaTrabajo: 'Riviera Spa',
        cargo: 'Administradora',
        telefonoEmpresa: '6025550202',
        ingresosMensuales: 4900000,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: makeId(),
        nombres: 'Julián',
        apellidos: 'Mora',
        cedula: '50505050',
        telefonoCelular: '3159998877',
        correo: 'julian@example.com',
        direccionResidencia: 'Calle 5 #19-44',
        ciudad: 'Medellín',
        empresaTrabajo: 'JM Construcciones',
        cargo: 'Ingeniero',
        telefonoEmpresa: '6045550202',
        ingresosMensuales: 7200000,
        createdAt: now,
        updatedAt: now,
      },
    ];

    const contratos: Contrato[] = [
      {
        id: makeId(),
        numeroContrato: `CTR-${anio}-001`,
        inmuebleId: inmuebles[0].id,
        arrendatarioId: personas[0].id,
        codeudorId: personas[1].id,
        fechaInicio: `${anio}-01-01`,
        fechaFin: `${anio}-12-31`,
        canonMensual: 2800000,
        diaVencimientoPago: 5,
        medioPago: 'Transferencia Bancolombia',
        tipoContrato: TipoContrato.DIRECTO,
        direccionCorrespondencia: 'Cra 45 #98-12, Torre A 402',
        valorDeposito: 2800000,
        ipcAnual: 9.2,
        canonConIPC: calcularCanonConIPC(2800000, 9.2),
        estado: EstadoContrato.ACTIVO,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: makeId(),
        numeroContrato: `CTR-${anio}-002`,
        inmuebleId: inmuebles[2].id,
        arrendatarioId: personas[2].id,
        codeudorId: personas[3].id,
        fechaInicio: `${anio}-02-01`,
        fechaFin: `${anio}-11-30`,
        canonMensual: 3500000,
        diaVencimientoPago: 10,
        medioPago: 'Nequi',
        tipoContrato: TipoContrato.SEGURO_ARRIENDO,
        direccionCorrespondencia: 'Av 3N #49-12',
        valorDeposito: 3500000,
        ipcAnual: 8.7,
        canonConIPC: calcularCanonConIPC(3500000, 8.7),
        estado: EstadoContrato.ACTIVO,
        createdAt: now,
        updatedAt: now,
      },
    ];

    const pagos: Pago[] = [
      {
        id: makeId(),
        contratoId: contratos[0].id,
        mesCorresponde: mesActual,
        fechaPago: `${mesActual}-03`,
        valorEsperado: 2800000,
        valorPagado: 2800000,
        tipoPago: TipoPago.COMPLETO,
        metodoPago: MetodoPago.TRANSFERENCIA,
        numeroComprobante: 'BCO-1201',
        notificacionEnviada: true,
        createdAt: now,
      },
      {
        id: makeId(),
        contratoId: contratos[1].id,
        mesCorresponde: mesActual,
        fechaPago: `${mesActual}-06`,
        valorEsperado: 3500000,
        valorPagado: 3500000,
        tipoPago: TipoPago.COMPLETO,
        metodoPago: MetodoPago.NEQUI,
        numeroComprobante: 'NQ-3301',
        notificacionEnviada: true,
        createdAt: now,
      },
      {
        id: makeId(),
        contratoId: contratos[0].id,
        mesCorresponde: mesActual,
        fechaPago: `${mesActual}-08`,
        valorEsperado: 2800000,
        valorPagado: 1500000,
        tipoPago: TipoPago.PARCIAL,
        metodoPago: MetodoPago.TRANSFERENCIA,
        saldoPendiente: 1300000,
        numeroComprobante: 'BCO-1202',
        nota: 'Abono parcial',
        notificacionEnviada: false,
        createdAt: now,
      },
      {
        id: makeId(),
        contratoId: contratos[1].id,
        mesCorresponde: mesActual,
        fechaPago: `${mesActual}-11`,
        valorEsperado: 3500000,
        valorPagado: 0,
        tipoPago: TipoPago.MORA,
        metodoPago: MetodoPago.OTRO,
        saldoPendiente: 3500000,
        nota: 'Pago pendiente',
        notificacionEnviada: false,
        createdAt: now,
      },
    ];

    const mantenimientos: Mantenimiento[] = [
      {
        id: makeId(),
        inmuebleId: inmuebles[2].id,
        fechaMantenimiento: sumarDias(ahora.toISOString().slice(0, 10), -2),
        tipoMantenimiento: 'plomería',
        descripcion: 'Cambio de tubería principal',
        proveedor: 'Plomeros Express',
        telefonoProveedor: '3007776655',
        costoTotal: 850000,
        estado: EstadoMantenimiento.PENDIENTE,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: makeId(),
        inmuebleId: inmuebles[0].id,
        fechaMantenimiento: sumarDias(ahora.toISOString().slice(0, 10), -20),
        tipoMantenimiento: 'pintura',
        descripcion: 'Retoque general de muros',
        proveedor: 'Color Hogar',
        telefonoProveedor: '3019988776',
        costoTotal: 420000,
        estado: EstadoMantenimiento.TERMINADO,
        createdAt: now,
        updatedAt: now,
      },
    ];

    this.storage.setItem(STORAGE_KEYS.inmuebles, JSON.stringify(inmuebles));
    this.storage.setItem(STORAGE_KEYS.personas, JSON.stringify(personas));
    this.storage.setItem(STORAGE_KEYS.contratos, JSON.stringify(contratos));
    this.storage.setItem(STORAGE_KEYS.pagos, JSON.stringify(pagos));
    this.storage.setItem(STORAGE_KEYS.mantenimientos, JSON.stringify(mantenimientos));
    this.storage.setItem(STORAGE_KEYS.seed, 'true');
  }
}
