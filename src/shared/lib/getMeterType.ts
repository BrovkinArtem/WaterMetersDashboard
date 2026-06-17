import type { MeterKind } from '@/shared/api/types';

const METER_TYPE_MAP: Record<string, MeterKind> = {
  ColdWaterAreaMeter: 'ColdWaterAreaMeter',
  HotWaterAreaMeter: 'HotWaterAreaMeter',
  HeatAreaMeter: 'HeatAreaMeter',
  ElectricityAreaMeter: 'ElectricityAreaMeter',
};

const METER_LABELS: Record<MeterKind, string> = {
  ColdWaterAreaMeter: 'ХВС',
  HotWaterAreaMeter: 'ГВС',
  HeatAreaMeter: 'ТПЛ',
  ElectricityAreaMeter: 'ЭЛДТ',
  unknown: '—',
};

export function getMeterKind(types: string[]): MeterKind {
  const knownType = types.find((type) => type in METER_TYPE_MAP);
  return knownType ? METER_TYPE_MAP[knownType] : 'unknown';
}

export function getMeterTypeLabel(kind: MeterKind): string {
  return METER_LABELS[kind];
}
