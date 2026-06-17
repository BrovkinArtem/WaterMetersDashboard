import { types } from 'mobx-state-tree';

import { MetersStore } from '@/features/meters-list/model/metersStore';

export const RootStore = types.model('RootStore', {
  meters: MetersStore,
});

export type RootStoreInstance = typeof RootStore.Type;

export function createRootStore() {
  return RootStore.create({
    meters: {},
  });
}
