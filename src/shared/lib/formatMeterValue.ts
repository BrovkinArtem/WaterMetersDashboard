export function formatMeterValue(values: number[]): string {
  if (!values.length) {
    return '—';
  }

  return values.join(', ');
}
