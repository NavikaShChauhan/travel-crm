import * as itineraryApi from '@api/itinerary.api';

/**
 * itinerary.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "itinerary" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real itineraryApi call, e.g.:
 *   const { data } = await itineraryApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/itinerary/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await itineraryApi.getAll(params)).data
  throw new Error('itineraryService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await itineraryApi.getById(id)).data
  throw new Error('itineraryService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await itineraryApi.create(payload)).data
  throw new Error('itineraryService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await itineraryApi.update(id, payload)).data
  throw new Error('itineraryService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await itineraryApi.remove(id)).data
  throw new Error('itineraryService.remove is not implemented yet');
};
