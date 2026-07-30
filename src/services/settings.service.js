import * as settingsApi from '@api/settings.api';

/**
 * settings.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "settings" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real settingsApi call, e.g.:
 *   const { data } = await settingsApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/settings/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await settingsApi.getAll(params)).data
  throw new Error('settingsService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await settingsApi.getById(id)).data
  throw new Error('settingsService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await settingsApi.create(payload)).data
  throw new Error('settingsService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await settingsApi.update(id, payload)).data
  throw new Error('settingsService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await settingsApi.remove(id)).data
  throw new Error('settingsService.remove is not implemented yet');
};
