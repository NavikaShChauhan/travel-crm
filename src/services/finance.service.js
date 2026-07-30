import * as financeApi from '@api/finance.api';

/**
 * finance.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "finance" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real financeApi call, e.g.:
 *   const { data } = await financeApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/finance/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await financeApi.getAll(params)).data
  throw new Error('financeService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await financeApi.getById(id)).data
  throw new Error('financeService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await financeApi.create(payload)).data
  throw new Error('financeService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await financeApi.update(id, payload)).data
  throw new Error('financeService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await financeApi.remove(id)).data
  throw new Error('financeService.remove is not implemented yet');
};
