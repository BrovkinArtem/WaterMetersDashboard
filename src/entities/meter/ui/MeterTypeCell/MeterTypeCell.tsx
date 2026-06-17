import type { FC, SVGProps } from 'react';

import type { MeterKind } from '@/shared/api/types';
import EnergyIcon from '@/assets/icons/energy.svg?react';
import FireIcon from '@/assets/icons/fire.svg?react';
import HotWaterIcon from '@/assets/icons/hotWater.svg?react';
import WaterIcon from '@/assets/icons/water.svg?react';
import { getMeterTypeLabel } from '@/shared/lib/getMeterType';

import styles from './MeterTypeCell.module.scss';

const ICONS: Record<MeterKind, FC<SVGProps<SVGSVGElement>> | null> = {
  ColdWaterAreaMeter: WaterIcon,
  HotWaterAreaMeter: HotWaterIcon,
  HeatAreaMeter: FireIcon,
  ElectricityAreaMeter: EnergyIcon,
  unknown: null,
};

interface MeterTypeCellProps {
  kind: MeterKind;
}

export function MeterTypeCell({ kind }: MeterTypeCellProps) {
  const Icon = ICONS[kind];

  return (
    <div className={styles.meterTypeCell}>
      {Icon && <Icon className={styles.meterTypeCell__icon} aria-hidden />}
      <span className={styles.meterTypeCell__label}>
        {getMeterTypeLabel(kind)}
      </span>
    </div>
  );
}
