import type { AreaDto } from '@/shared/api/types';

export function formatAddress(area: AreaDto): string {
  const apartment = area.str_number_full || area.str_number;
  const parts = [area.house.address];

  if (apartment) {
    parts.push(apartment);
  }

  return parts.join(', ');
}
