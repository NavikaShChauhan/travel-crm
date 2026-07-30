import * as suppliersApi from '@api/suppliers.api';

/**
 * suppliers.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "suppliers" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real suppliersApi call, e.g.:
 *   const { data } = await suppliersApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/suppliers/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await suppliersApi.getAll(params)).data
  throw new Error('suppliersService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await suppliersApi.getById(id)).data
  throw new Error('suppliersService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await suppliersApi.create(payload)).data
  throw new Error('suppliersService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await suppliersApi.update(id, payload)).data
  throw new Error('suppliersService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await suppliersApi.remove(id)).data
  throw new Error('suppliersService.remove is not implemented yet');
};
