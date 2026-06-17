import { observer } from 'mobx-react-lite';

import { useStore } from '@/app/providers/storeContext';
import { Pagination } from '@/shared/ui/Pagination/Pagination';

import { MetersTableHeader } from './MetersTableHeader';
import { MetersTableRow } from './MetersTableRow';
import styles from './MetersTable.module.scss';

export const MetersTable = observer(function MetersTable() {
  const { meters: store } = useStore();

  return (
    <div className={styles.metersTable}>
      <MetersTableHeader />

      <div className={styles.metersTable__body}>
        {store.isLoading && !store.meters.length ? (
          <div className={styles.metersTable__message}>Загрузка...</div>
        ) : null}

        {store.error ? (
          <div className={styles.metersTable__message}>{store.error}</div>
        ) : null}

        {!store.isLoading && !store.error && !store.meters.length ? (
          <div className={styles.metersTable__message}>
            Счётчики не найдены
          </div>
        ) : null}

        {store.meters.map((meter, index) => (
          <MetersTableRow
            key={meter.id}
            index={store.offset + index + 1}
            meter={meter}
            address={store.getAddress(meter.areaId)}
            isDeleting={store.deletingId !== null}
            onDelete={(meterId) => store.deleteMeter(meterId)}
          />
        ))}
      </div>

      <div className={styles.metersTable__footer}>
        <Pagination
          currentPage={store.currentPage}
          totalPages={store.totalPages}
          onPageChange={(page) => store.loadPage(page)}
        />
      </div>
    </div>
  );
});
