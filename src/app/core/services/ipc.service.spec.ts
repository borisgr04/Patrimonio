import { TestBed } from '@angular/core/testing';

import { IpcService } from './ipc.service';
import { EstadoContrato, MetodoPago, TipoPago, TipoContrato } from '../models/enums';
import { Contrato } from '../models/contrato.model';
import { Pago } from '../models/pago.model';

describe('IpcService', () => {
  let service: IpcService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IpcService);
  });

  it('should calculate canon with ipc', () => {
    expect(service.calcularCanonConIPC(1000000, 10)).toBe(1100000);
  });

  it('should detect mora when due date has passed without enough payment', () => {
    const contrato: Contrato = {
      id: '1',
      numeroContrato: 'CTR-2026-001',
      inmuebleId: 'i',
      arrendatarioId: 'a',
      codeudorId: 'c',
      fechaInicio: '2026-01-01',
      fechaFin: '2026-12-31',
      canonMensual: 1000000,
      diaVencimientoPago: 1,
      medioPago: 'Transferencia',
      tipoContrato: TipoContrato.DIRECTO,
      estado: EstadoContrato.ACTIVO,
      createdAt: '2026-01-01T00:00:00.000Z',
      updatedAt: '2026-01-01T00:00:00.000Z',
    };
    const pagos: Pago[] = [
      {
        id: 'p1',
        contratoId: '1',
        mesCorresponde: `${new Date().getFullYear()}-${String(new Date().getMonth() + 1).padStart(2, '0')}`,
        fechaPago: '2026-05-01',
        valorEsperado: 1000000,
        valorPagado: 0,
        tipoPago: TipoPago.MORA,
        metodoPago: MetodoPago.OTRO,
        notificacionEnviada: false,
        createdAt: '2026-05-01T00:00:00.000Z',
      },
    ];

    expect(service.estaEnMora(contrato, pagos)).toBe(true);
  });
});
