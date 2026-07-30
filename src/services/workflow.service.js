import * as workflowApi from '@api/workflow.api';

/**
 * workflow.service.js
 * -----------------------------------------------------------------------
 * Business-logic layer for the "workflow" domain. Pages/components call
 * these functions, never the api/ layer directly. This is where
 * response shaping, error normalization, and cross-cutting rules will
 * live, so that swapping mock data for the real API never touches a
 * page component.
 *
 * TODO: once the backend exists, replace each function body below with
 * a real workflowApi call, e.g.:
 *   const { data } = await workflowApi.getAll(params);
 *   return data;
 *
 * Until then, pages import mock JSON directly from this module's own
 * data/ folder (src/modules/workflow/data) so screens can be built end to end.
 */

export const getAll = async (params) => {
  // TODO: return (await workflowApi.getAll(params)).data
  throw new Error('workflowService.getAll is not implemented yet');
};

export const getById = async (id) => {
  // TODO: return (await workflowApi.getById(id)).data
  throw new Error('workflowService.getById is not implemented yet');
};

export const create = async (payload) => {
  // TODO: return (await workflowApi.create(payload)).data
  throw new Error('workflowService.create is not implemented yet');
};

export const update = async (id, payload) => {
  // TODO: return (await workflowApi.update(id, payload)).data
  throw new Error('workflowService.update is not implemented yet');
};

export const remove = async (id) => {
  // TODO: return (await workflowApi.remove(id)).data
  throw new Error('workflowService.remove is not implemented yet');
};
