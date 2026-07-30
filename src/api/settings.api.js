import axiosClient from './axiosClient';

/**
 * settings.api.js
 * -----------------------------------------------------------------------
 * Thin HTTP layer for the "settings" domain. Every function here maps 1:1
 * to an Express route and returns the raw axios response promise.
 * No business logic, no data shaping — that belongs in
 * `services/settings.service.js`.
 *
 * Base path (planned): /api/settings
 */

const BASE_PATH = '/settings';

// TODO: GET  ${BASE_PATH}          -> list all settings (supports query params: page, pageSize, filters, sort)
export const getAll = (params) => axiosClient.get(BASE_PATH, { params });

// TODO: GET  ${BASE_PATH}/:id      -> fetch a single settings record by id
export const getById = (id) => axiosClient.get(`${BASE_PATH}/${id}`);

// TODO: POST ${BASE_PATH}          -> create a new settings record
export const create = (payload) => axiosClient.post(BASE_PATH, payload);

// TODO: PUT  ${BASE_PATH}/:id      -> update an existing settings record
export const update = (id, payload) => axiosClient.put(`${BASE_PATH}/${id}`, payload);

// TODO: DELETE ${BASE_PATH}/:id    -> delete a settings record
export const remove = (id) => axiosClient.delete(`${BASE_PATH}/${id}`);
