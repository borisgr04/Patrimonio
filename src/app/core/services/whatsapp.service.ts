import { Injectable } from '@angular/core';
import { formatearMonedaCop } from '../utils/currency.util';

interface PlantillaPago {
  nombre: string;
  inmueble: string;
  valor: number;
  mes: string;
  numero?: string;
  fecha?: string;
  medio?: string;
}

@Injectable({ providedIn: 'root' })
export class WhatsappService {
  generarLink(telefono: string, mensaje: string): string {
    const limpio = telefono.replace(/\D/g, '');
    return `https://wa.me/57${limpio}?text=${encodeURIComponent(mensaje)}`;
  }

  crearMensajeConfirmacionPago(data: PlantillaPago): string {
    return `Hola ${data.nombre}, confirmamos recibo de pago canon arriendo ${data.inmueble} por ${formatearMonedaCop(data.valor)} correspondiente a ${data.mes}. Comprobante: ${data.numero ?? 'sin número'}. Gracias.`;
  }

  crearMensajeRecordatorio(data: PlantillaPago): string {
    return `Hola ${data.nombre}, le recordamos que el canon de arriendo ${data.inmueble} por ${formatearMonedaCop(data.valor)} vence el ${data.fecha ?? 'próximamente'}. Medio de pago: ${data.medio ?? 'acordado'}.`;
  }

  crearMensajeMora(data: PlantillaPago): string {
    return `Hola ${data.nombre}, el canon de arriendo ${data.inmueble} por ${formatearMonedaCop(data.valor)} correspondiente a ${data.mes} se encuentra vencido desde ${data.fecha ?? 'la fecha pactada'}. Por favor regularice su pago.`;
  }
}
