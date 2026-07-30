import * as inquiryApi from '@api/inquiry.api';

/**
 * inquiry.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "inquiry" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real inquiryApi call, e.g.:
 *   const { data } = await inquiryApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/inquiry/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await inquiryApi.getAll(params)).data
  throw new Error('inquiryService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await inquiryApi.getById(id)).data
  throw new Error('inquiryService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await inquiryApi.create(payload)).data
  throw new Error('inquiryService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await inquiryApi.update(id, payload)).data
  throw new Error('inquiryService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await inquiryApi.remove(id)).data
  throw new Error('inquiryService.remove is not implemented yet');
};
