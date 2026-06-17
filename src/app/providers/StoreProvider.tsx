import type { ReactNode } from 'react';

import { StoreContext } from '@/app/providers/storeContext';
import type { RootStoreInstance } from '@/app/store/rootStore';

interface StoreProviderProps {
  store: RootStoreInstance;
  children: ReactNode;
}

export function StoreProvider({ store, children }: StoreProviderProps) {
  return (
    <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
  );
}
