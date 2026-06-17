import { apiClient } from '@/shared/api/client';
import type { AreaDto, MeterDto, PaginatedResponse } from '@/shared/api/types';

export const metersApi = {
  fetchList(limit: number, offset: number) {
    return apiClient.get<PaginatedResponse<MeterDto>>('/meters/', {
      params: { limit, offset },
    });
  },

  delete(meterId: string) {
    return apiClient.delete(`/meters/${meterId}/`);
  },
};

export const areasApi = {
  fetchByIds(ids: string[]) {
    return apiClient.get<PaginatedResponse<AreaDto>>('/areas/', {
      params: { id__in: ids },
      paramsSerializer: {
        indexes: null,
      },
    });
  },
};
