const dateFormatter = new Intl.DateTimeFormat('es-CO', {
  dateStyle: 'medium',
  timeZone: 'America/Bogota',
});

export function formatearFechaColombia(valor: string | Date | null | undefined): string {
  if (!valor) {
    return 'Sin fecha';
  }

  const fecha = typeof valor === 'string' ? new Date(`${valor}T00:00:00`) : valor;
  return Number.isNaN(fecha.getTime()) ? 'Fecha inválida' : dateFormatter.format(fecha);
}

export function obtenerMesActual(): string {
  const ahora = new Date();
  return `${ahora.getFullYear()}-${String(ahora.getMonth() + 1).padStart(2, '0')}`;
}

export function sumarDias(fechaIso: string, dias: number): string {
  const fecha = new Date(`${fechaIso}T00:00:00`);
  fecha.setDate(fecha.getDate() + dias);
  return fecha.toISOString().slice(0, 10);
}

export function diferenciaEnDias(fechaIso: string, base = new Date()): number {
  const fecha = new Date(`${fechaIso}T00:00:00`);
  const comparacion = new Date(base.getFullYear(), base.getMonth(), base.getDate());
  return Math.floor((fecha.getTime() - comparacion.getTime()) / 86_400_000);
}
