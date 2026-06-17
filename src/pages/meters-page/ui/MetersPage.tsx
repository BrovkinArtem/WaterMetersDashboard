import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { useStore } from '@/app/providers/storeContext';
import { MetersTable } from '@/widgets/meters-table/ui/MetersTable';

import styles from './MetersPage.module.scss';

export const MetersPage = observer(function MetersPage() {
  const { meters: store } = useStore();

  useEffect(() => {
    store.loadPage(1);
  }, [store]);

  return (
    <main className={styles.metersPage}>
      <h1 className={styles.metersPage__title}>Список счётчиков</h1>
      <MetersTable />
    </main>
  );
});
