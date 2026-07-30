import * as dashboardApi from '@api/dashboard.api';

/**
 * dashboard.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "dashboard" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real dashboardApi call, e.g.:
 *   const { data } = await dashboardApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/dashboard/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await dashboardApi.getAll(params)).data
  throw new Error('dashboardService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await dashboardApi.getById(id)).data
  throw new Error('dashboardService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await dashboardApi.create(payload)).data
  throw new Error('dashboardService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await dashboardApi.update(id, payload)).data
  throw new Error('dashboardService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await dashboardApi.remove(id)).data
  throw new Error('dashboardService.remove is not implemented yet');
};
