import * as notificationsApi from '@api/notifications.api';

/**
 * notifications.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "notifications" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real notificationsApi call, e.g.:
 *   const { data } = await notificationsApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/notifications/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await notificationsApi.getAll(params)).data
  throw new Error('notificationsService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await notificationsApi.getById(id)).data
  throw new Error('notificationsService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await notificationsApi.create(payload)).data
  throw new Error('notificationsService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await notificationsApi.update(id, payload)).data
  throw new Error('notificationsService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await notificationsApi.remove(id)).data
  throw new Error('notificationsService.remove is not implemented yet');
};
