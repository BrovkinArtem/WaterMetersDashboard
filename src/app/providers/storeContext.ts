import { createContext, useContext } from 'react';

import type { RootStoreInstance } from '@/app/store/rootStore';

export const StoreContext = createContext<RootStoreInstance | null>(null);

export function useStore() {
  const store = useContext(StoreContext);

  if (!store) {
    throw new Error('StoreProvider is missing');
  }

  return store;
}
