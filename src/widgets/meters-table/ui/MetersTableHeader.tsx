import styles from './MetersTableHeader.module.scss';

const COLUMNS = [
  { key: 'number', label: '№', className: styles['metersTableHeader__cell--number'] },
  { key: 'type', label: 'Тип', className: styles['metersTableHeader__cell--type'] },
  {
    key: 'date',
    label: 'Дата установки',
    className: styles['metersTableHeader__cell--date'],
  },
  {
    key: 'automatic',
    label: 'Автоматический',
    className: styles['metersTableHeader__cell--automatic'],
  },
  {
    key: 'value',
    label: 'Текущие показания',
    className: styles['metersTableHeader__cell--value'],
  },
  {
    key: 'address',
    label: 'Адрес',
    className: styles['metersTableHeader__cell--address'],
  },
  {
    key: 'note',
    label: 'Примечание',
    className: styles['metersTableHeader__cell--note'],
  },
  {
    key: 'actions',
    label: '',
    className: styles['metersTableHeader__cell--actions'],
  },
];

export function MetersTableHeader() {
  return (
    <div className={styles.metersTableHeader}>
      {COLUMNS.map((column) => (
        <div
          key={column.key}
          className={`${styles.metersTableHeader__cell} ${column.className}`}
        >
          {column.label}
        </div>
      ))}
    </div>
  );
}
