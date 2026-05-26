const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

export function formatearMonedaCop(valor: number | null | undefined): string {
  return currencyFormatter.format(valor ?? 0);
}
