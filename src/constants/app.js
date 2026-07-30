export const APP_NAME = 'Voyage';
export const APP_FULL_NAME = 'Voyage Travel CRM';

/** Local/session storage keys — centralised so renames don't break lookups. */
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'voyage_auth_token',
  REFRESH_TOKEN: 'voyage_refresh_token',
};

/** Shared pagination defaults for list/table views across modules. */
export const PAGINATION_DEFAULTS = {
  page: 0,
  pageSize: 10,
  pageSizeOptions: [10, 25, 50],
};
