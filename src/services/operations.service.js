import * as operationsApi from '@api/operations.api';

/**
 * operations.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "operations" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real operationsApi call, e.g.:
 *   const { data } = await operationsApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/operations/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await operationsApi.getAll(params)).data
  throw new Error('operationsService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await operationsApi.getById(id)).data
  throw new Error('operationsService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await operationsApi.create(payload)).data
  throw new Error('operationsService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await operationsApi.update(id, payload)).data
  throw new Error('operationsService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await operationsApi.remove(id)).data
  throw new Error('operationsService.remove is not implemented yet');
};

const operationsHandoverStore = [];

export const registerConfirmedBooking = (bookingData) => {
  operationsHandoverStore.push({
    ...bookingData,
    handoverDate: new Date().toISOString(),
    opsStatus: 'Pending Allocation',
  });
  return { success: true, bookingId: bookingData.bookingId };
};

export const getHandedOverBookings = () => operationsHandoverStore;

