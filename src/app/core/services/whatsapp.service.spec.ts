import { TestBed } from '@angular/core/testing';

import { WhatsappService } from './whatsapp.service';

describe('WhatsappService', () => {
  let service: WhatsappService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhatsappService);
  });

  it('should create wa.me links with encoded text', () => {
    const link = service.generarLink('3001234567', 'Hola mundo');
    expect(link).toBe('https://wa.me/573001234567?text=Hola%20mundo');
  });

  it('should compose payment confirmation messages', () => {
    const message = service.crearMensajeConfirmacionPago({
      nombre: 'Laura',
      inmueble: 'Torre Central 402',
      valor: 1500000,
      mes: '2026-05',
      numero: 'ABC-1',
    });

    expect(message).toContain('Laura');
    expect(message).toContain('ABC-1');
  });
});
