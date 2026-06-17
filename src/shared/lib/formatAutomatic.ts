export function formatAutomatic(value: boolean | null): string {
  if (value === true) {
    return 'да';
  }

  if (value === false) {
    return 'нет';
  }

  return '—';
}
