import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ContratosService } from '../../../contratos/services/contratos.service';
import { InmueblesService } from '../../../inmuebles/services/inmuebles.service';
import { PagosStore } from '../../store/pagos.store';
import { WhatsappService } from '../../../../core/services/whatsapp.service';
import { Contrato } from '../../../../core/models/contrato.model';
import { Inmueble } from '../../../../core/models/inmueble.model';
import { Persona } from '../../../../core/models/persona.model';
import { Pago } from '../../../../core/models/pago.model';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { EmptyStateComponent } from '../../../../shared/components/empty-state/empty-state.component';
import { PagoCardComponent } from '../../components/pago-card/pago-card.component';

@Component({
  selector: 'app-pagos-list',
  standalone: true,
  imports: [MatButtonModule, PageHeaderComponent, EmptyStateComponent, PagoCardComponent],
  templateUrl: './pagos-list.component.html',
  styleUrl: './pagos-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PagosListComponent {
  protected readonly store = inject(PagosStore);
  private readonly contratosService = inject(ContratosService);
  private readonly inmueblesService = inject(InmueblesService);
  private readonly whatsapp = inject(WhatsappService);
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
  protected readonly agrupados = computed(() => {
    const mapa = new Map<string, Pago[]>();
    this.store.pagos().forEach((pago: Pago) => {
      const group = mapa.get(pago.mesCorresponde) ?? [];
      group.push(pago);
      mapa.set(pago.mesCorresponde, group);
    });
    return Array.from(mapa.entries()).sort((a, b) => b[0].localeCompare(a[0]));
  });

  constructor() {
    this.store.cargar();
  }

  protected nombreArrendatario(contratoId: string): string {
    const contrato = this.contratos.find((item: Contrato) => item.id === contratoId);
    const persona = this.personas.find((item: Persona) => item.id === contrato?.arrendatarioId);
    return persona ? `${persona.nombres} ${persona.apellidos}` : 'Sin arrendatario';
  }

  protected nombreInmueble(contratoId: string): string {
    const contrato = this.contratos.find((item: Contrato) => item.id === contratoId);
    return (
      this.inmuebles.find((item: Inmueble) => item.id === contrato?.inmuebleId)?.alias ??
      'Sin inmueble'
    );
  }

  protected enlaceWhatsapp(
    contratoId: string,
    valor: number,
    mes: string,
    numero?: string,
    esMora = false,
  ): string {
    const contrato = this.contratos.find((item: Contrato) => item.id === contratoId);
    const persona = this.personas.find((item: Persona) => item.id === contrato?.arrendatarioId);
    const inmueble = this.inmuebles.find((item: Inmueble) => item.id === contrato?.inmuebleId);
    if (!persona || !contrato || !inmueble) {
      return '';
    }
    const mensaje = esMora
      ? this.whatsapp.crearMensajeMora({
          nombre: persona.nombres,
          inmueble: inmueble.alias,
          valor,
          mes,
          fecha: contrato.fechaFin,
        })
      : this.whatsapp.crearMensajeConfirmacionPago({
          nombre: persona.nombres,
          inmueble: inmueble.alias,
          valor,
          mes,
          numero,
        });
    return this.whatsapp.generarLink(persona.telefonoCelular, mensaje);
  }
}
