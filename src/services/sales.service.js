import * as salesApi from '@api/sales.api';

/**
 * sales.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "sales" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real salesApi call, e.g.:
 *   const { data } = await salesApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/sales/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await salesApi.getAll(params)).data
  throw new Error('salesService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await salesApi.getById(id)).data
  throw new Error('salesService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await salesApi.create(payload)).data
  throw new Error('salesService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await salesApi.update(id, payload)).data
  throw new Error('salesService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await salesApi.remove(id)).data
  throw new Error('salesService.remove is not implemented yet');
};
