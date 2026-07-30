import * as customersApi from '@api/customers.api';

/**
 * customers.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "customers" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real customersApi call, e.g.:
 *   const { data } = await customersApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/customers/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await customersApi.getAll(params)).data
  throw new Error('customersService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await customersApi.getById(id)).data
  throw new Error('customersService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await customersApi.create(payload)).data
  throw new Error('customersService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await customersApi.update(id, payload)).data
  throw new Error('customersService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await customersApi.remove(id)).data
  throw new Error('customersService.remove is not implemented yet');
};
