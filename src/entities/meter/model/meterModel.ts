import { types } from 'mobx-state-tree';

import type { MeterKind } from '@/shared/api/types';

export const MeterModel = types.model('Meter', {
  id: types.identifier,
  kind: types.frozen<MeterKind>(),
  areaId: types.string,
  installationDate: types.string,
  isAutomatic: types.maybeNull(types.boolean),
  initialValues: types.array(types.number),
  description: types.maybeNull(types.string),
});

export type MeterInstance = typeof MeterModel.Type;
