import * as reportsApi from '@api/reports.api';

/**
 * reports.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "reports" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real reportsApi call, e.g.:
 *   const { data } = await reportsApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/reports/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await reportsApi.getAll(params)).data
  throw new Error('reportsService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await reportsApi.getById(id)).data
  throw new Error('reportsService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await reportsApi.create(payload)).data
  throw new Error('reportsService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await reportsApi.update(id, payload)).data
  throw new Error('reportsService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await reportsApi.remove(id)).data
  throw new Error('reportsService.remove is not implemented yet');
};
