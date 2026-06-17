import { flow, types } from 'mobx-state-tree';

import { MeterModel } from '@/entities/meter/model/meterModel';
import { areasApi, metersApi } from '@/shared/api';
import type { AreaDto, MeterDto } from '@/shared/api/types';
import { METERS_PAGE_SIZE } from '@/shared/config/constants';
import { formatAddress } from '@/shared/lib/formatAddress';
import { getMeterKind } from '@/shared/lib/getMeterType';

function mapMeterDto(dto: MeterDto) {
  return {
    id: dto.id,
    kind: getMeterKind(dto._type),
    areaId: dto.area.id,
    installationDate: dto.installation_date,
    isAutomatic: dto.is_automatic,
    initialValues: dto.initial_values,
    description: dto.description,
  };
}

export const MetersStore = types
  .model('MetersStore', {
    meters: types.array(MeterModel),
    areasCache: types.map(types.string),
    totalCount: types.optional(types.number, 0),
    currentPage: types.optional(types.number, 1),
    limit: types.optional(types.number, METERS_PAGE_SIZE),
    tailOffset: types.optional(types.number, 0),
    isLoading: types.optional(types.boolean, false),
    deletingId: types.maybeNull(types.string),
    error: types.maybeNull(types.string),
  })
  .views((self) => ({
    get offset() {
      return (self.currentPage - 1) * self.limit;
    },

    get totalPages() {
      return Math.max(1, Math.ceil(self.totalCount / self.limit));
    },

    getAddress(areaId: string) {
      return self.areasCache.get(areaId) ?? '';
    },
  }))
  .actions((self) => {
    const loadMissingAreas = flow(function* (areaIds: string[]) {
      const missingIds = [...new Set(areaIds)].filter(
        (id) => !self.areasCache.has(id)
      );

      if (!missingIds.length) {
        return;
      }

      const { data } = yield areasApi.fetchByIds(missingIds);

      data.results.forEach((area: AreaDto) => {
        self.areasCache.set(area.id, formatAddress(area));
      });
    });

    const fetchMeters = flow(function* (limit: number, offset: number) {
      const { data } = yield metersApi.fetchList(limit, offset);
      return data;
    });

    return {
      loadPage: flow(function* (page = self.currentPage) {
        self.isLoading = true;
        self.error = null;
        self.currentPage = page;

        try {
          const data = yield fetchMeters(self.limit, self.offset);
          self.meters.replace(data.results.map(mapMeterDto));
          self.totalCount = data.count;
          self.tailOffset = self.offset + data.results.length;
        } catch {
          self.error = 'Не удалось загрузить список счётчиков';
        } finally {
          self.isLoading = false;
        }

        if (!self.error && self.meters.length) {
          try {
            const areaIds = self.meters.map((meter) => meter.areaId);
            yield loadMissingAreas(areaIds);
          } catch {
            self.error = 'Не удалось загрузить адреса';
          }
        }
      }),

      deleteMeter: flow(function* (meterId: string) {
        if (self.deletingId) {
          return;
        }

        self.deletingId = meterId;
        self.error = null;

        try {
          yield metersApi.delete(meterId);

          const deletedIndex = self.meters.findIndex(
            (meter) => meter.id === meterId
          );

          if (deletedIndex === -1) {
            return;
          }

          self.meters.splice(deletedIndex, 1);
          self.totalCount = Math.max(0, self.totalCount - 1);

          if (self.tailOffset < self.totalCount) {
            const data = yield fetchMeters(1, self.tailOffset);
            const nextMeter = data.results[0];

            if (nextMeter) {
              if (!self.meters.some((meter) => meter.id === nextMeter.id)) {
                self.meters.push(mapMeterDto(nextMeter));

                try {
                  yield loadMissingAreas([nextMeter.area.id]);
                } catch {
                  self.error = 'Не удалось загрузить адрес';
                }
              }

              self.tailOffset += 1;
            }
          }
        } catch {
          self.error = 'Не удалось удалить счётчик';
        } finally {
          self.deletingId = null;
        }
      }),
    };
  });

export type MetersStoreInstance = typeof MetersStore.Type;
