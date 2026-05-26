import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Router } from '@angular/router';
import { MetodoPago, TipoPago } from '../../../../core/models/enums';
import { Contrato } from '../../../../core/models/contrato.model';
import { Inmueble } from '../../../../core/models/inmueble.model';
import { Persona } from '../../../../core/models/persona.model';
import { ContratosService } from '../../../contratos/services/contratos.service';
import { InmueblesService } from '../../../inmuebles/services/inmuebles.service';
import { PagosStore } from '../../store/pagos.store';
import { WhatsappService } from '../../../../core/services/whatsapp.service';
import { PagoFormComponent } from '../../components/pago-form/pago-form.component';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { WhatsappButtonComponent } from '../../components/whatsapp-button/whatsapp-button.component';

@Component({
  selector: 'app-registro-pago',
  standalone: true,
  imports: [PagoFormComponent, PageHeaderComponent, WhatsappButtonComponent],
  templateUrl: './registro-pago.component.html',
  styleUrl: './registro-pago.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistroPagoComponent {
  readonly contratoId = input('');
  private readonly store = inject(PagosStore);
  private readonly contratosService = inject(ContratosService);
  private readonly inmueblesService = inject(InmueblesService);
  private readonly whatsapp = inject(WhatsappService);
  private readonly router = inject(Router, { optional: true });
  private readonly contratosResult = this.contratosService.getAll();
  private readonly personasResult = this.contratosService.getPersonas();
  private readonly inmueblesResult = this.inmueblesService.getAll();
  protected readonly contratos: Contrato[] = this.contratosResult.success
    ? this.contratosResult.data
    : [];
  protected readonly personas: Persona[] = this.personasResult.success
    ? this.personasResult.data
    : [];
  protected readonly inmuebles: Inmueble[] = this.inmueblesResult.success
    ? this.inmueblesResult.data
    : [];
  protected readonly ultimoLink = signal('');

  protected guardar(payload: {
    contratoId: string;
    mesCorresponde: string;
    fechaPago: string;
    valorEsperado: number;
    valorPagado: number;
    tipoPago: TipoPago;
    metodoPago: MetodoPago;
    numeroComprobante?: string;
    nota?: string;
    notificacionEnviada: boolean;
  }): void {
    this.store.registrar(payload);
    const contrato = this.contratos.find((item: Contrato) => item.id === payload.contratoId);
    const persona = this.personas.find((item: Persona) => item.id === contrato?.arrendatarioId);
    const inmueble = this.inmuebles.find((item: Inmueble) => item.id === contrato?.inmuebleId);
    if (contrato && persona && inmueble) {
      const mensaje = this.whatsapp.crearMensajeConfirmacionPago({
        nombre: persona.nombres,
        inmueble: inmueble.alias,
        valor: payload.valorPagado,
        mes: payload.mesCorresponde,
        numero: payload.numeroComprobante,
      });
      this.ultimoLink.set(this.whatsapp.generarLink(persona.telefonoCelular, mensaje));
    }
    this.router?.navigateByUrl('/pagos');
  }
}
