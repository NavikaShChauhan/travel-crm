import * as partnersApi from '@api/partners.api';

/**
 * partners.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "partners" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real partnersApi call, e.g.:
 *   const { data } = await partnersApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/partners/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await partnersApi.getAll(params)).data
  throw new Error('partnersService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await partnersApi.getById(id)).data
  throw new Error('partnersService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await partnersApi.create(payload)).data
  throw new Error('partnersService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await partnersApi.update(id, payload)).data
  throw new Error('partnersService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await partnersApi.remove(id)).data
  throw new Error('partnersService.remove is not implemented yet');
};
