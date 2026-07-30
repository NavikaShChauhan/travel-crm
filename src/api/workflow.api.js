import axiosClient from './axiosClient';

/**
 * workflow.api.js
 * -----------------------------------------------------------------------
 * Thin HTTP layer for the "workflow" domain. Every function here maps 1:1
 * to an Express route and returns the raw axios response promise.
 * No business logic, no data shaping — that belongs in
 * `services/workflow.service.js`.
 *
 * Base path (planned): /api/workflows
 */

const BASE_PATH = '/workflows';

// TODO: GET  ${BASE_PATH}          -> list all workflow (supports query params: page, pageSize, filters, sort)
export const getAll = (params) => axiosClient.get(BASE_PATH, { params });

// TODO: GET  ${BASE_PATH}/:id      -> fetch a single workflow record by id
export const getById = (id) => axiosClient.get(`${BASE_PATH}/${id}`);

// TODO: POST ${BASE_PATH}          -> create a new workflow record
export const create = (payload) => axiosClient.post(BASE_PATH, payload);

// TODO: PUT  ${BASE_PATH}/:id      -> update an existing workflow record
export const update = (id, payload) => axiosClient.put(`${BASE_PATH}/${id}`, payload);

// TODO: DELETE ${BASE_PATH}/:id    -> delete a workflow record
export const remove = (id) => axiosClient.delete(`${BASE_PATH}/${id}`);
