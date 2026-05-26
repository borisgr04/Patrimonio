export enum EstadoInmueble {
  DISPONIBLE = 'disponible',
  ARRENDADO = 'arrendado',
  MANTENIMIENTO = 'mantenimiento',
  INHABILITADO = 'inhabilitado',
}

export enum TipoContrato {
  DIRECTO = 'directo',
  INMOBILIARIA = 'inmobiliaria',
  SEGURO_ARRIENDO = 'seguro_arriendo',
}

export enum EstadoContrato {
  ACTIVO = 'activo',
  VENCIDO = 'vencido',
  TERMINADO = 'terminado',
  RENOVADO = 'renovado',
}

export enum TipoPago {
  COMPLETO = 'completo',
  PARCIAL = 'parcial',
  MORA = 'mora',
  ANTICIPO = 'anticipo',
}

export enum MetodoPago {
  TRANSFERENCIA = 'transferencia',
  NEQUI = 'nequi',
  DAVIPLATA = 'daviplata',
  EFECTIVO = 'efectivo',
  OTRO = 'otro',
}

export enum EstadoMantenimiento {
  PENDIENTE = 'pendiente',
  EN_PROCESO = 'en_proceso',
  TERMINADO = 'terminado',
}
