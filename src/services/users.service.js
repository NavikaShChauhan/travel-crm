import * as usersApi from '@api/users.api';

/**
 * users.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "users" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real usersApi call, e.g.:
 *   const { data } = await usersApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/users/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await usersApi.getAll(params)).data
  throw new Error('usersService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await usersApi.getById(id)).data
  throw new Error('usersService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await usersApi.create(payload)).data
  throw new Error('usersService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await usersApi.update(id, payload)).data
  throw new Error('usersService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await usersApi.remove(id)).data
  throw new Error('usersService.remove is not implemented yet');
};
