const EIS24_API_URL = 'https://showroom.eis24.me/c300/api/v4/test';

export const API_BASE_URL = import.meta.env.PROD ? EIS24_API_URL : '/api';

export const METERS_PAGE_SIZE = 20;
