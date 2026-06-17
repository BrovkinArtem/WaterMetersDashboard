import { observer } from 'mobx-react-lite';

import type { MeterInstance } from '@/entities/meter/model/meterModel';
import { MeterTypeCell } from '@/entities/meter/ui/MeterTypeCell/MeterTypeCell';
import { DeleteButton } from '@/shared/ui/DeleteButton/DeleteButton';
import { formatAutomatic } from '@/shared/lib/formatAutomatic';
import { formatDate } from '@/shared/lib/formatDate';
import { formatMeterValue } from '@/shared/lib/formatMeterValue';

import styles from './MetersTableRow.module.scss';

interface MetersTableRowProps {
  index: number;
  meter: MeterInstance;
  address: string;
  isDeleting: boolean;
  onDelete: (meterId: string) => void;
}

export const MetersTableRow = observer(function MetersTableRow({
  index,
  meter,
  address,
  isDeleting,
  onDelete,
}: MetersTableRowProps) {
  return (
    <div className={styles.metersTableRow}>
      <div
        className={`${styles.metersTableRow__cell} ${styles['metersTableRow__cell--number']}`}
      >
        <span className={styles['metersTableRow__text--secondary']}>
          {index}
        </span>
      </div>

      <div
        className={`${styles.metersTableRow__cell} ${styles['metersTableRow__cell--type']}`}
      >
        <MeterTypeCell kind={meter.kind} />
      </div>

      <div
        className={`${styles.metersTableRow__cell} ${styles['metersTableRow__cell--date']}`}
      >
        <span>{formatDate(meter.installationDate)}</span>
      </div>

      <div
        className={`${styles.metersTableRow__cell} ${styles['metersTableRow__cell--automatic']}`}
      >
        <span>{formatAutomatic(meter.isAutomatic)}</span>
      </div>

      <div
        className={`${styles.metersTableRow__cell} ${styles['metersTableRow__cell--value']}`}
      >
        <span>{formatMeterValue(meter.initialValues)}</span>
      </div>

      <div
        className={`${styles.metersTableRow__cell} ${styles['metersTableRow__cell--address']}`}
      >
        <span className={styles.metersTableRow__ellipsis}>{address}</span>
      </div>

      <div
        className={`${styles.metersTableRow__cell} ${styles['metersTableRow__cell--note']}`}
      >
        <span
          className={`${styles.metersTableRow__ellipsis} ${styles['metersTableRow__text--secondary']}`}
        >
          {meter.description || '—'}
        </span>
      </div>

      <div
        className={`${styles.metersTableRow__cell} ${styles['metersTableRow__cell--actions']}`}
      >
        <div className={styles.metersTableRow__delete}>
          <DeleteButton
            disabled={isDeleting}
            onClick={(event) => {
              event.stopPropagation();
              onDelete(meter.id);
            }}
          />
        </div>
      </div>
    </div>
  );
});
