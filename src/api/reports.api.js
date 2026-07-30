import axiosClient from './axiosClient';

/**
 * reports.api.js
 * -----------------------------------------------------------------------
 * Thin HTTP layer for the "reports" domain. Every function here maps 1:1
 * to an Express route and returns the raw axios response promise.
 * No business logic, no data shaping — that belongs in
 * `services/reports.service.js`.
 *
 * Base path (planned): /api/reports
 */

const BASE_PATH = '/reports';

// TODO: GET  ${BASE_PATH}          -> list all reports (supports query params: page, pageSize, filters, sort)
export const getAll = (params) => axiosClient.get(BASE_PATH, { params });

// TODO: GET  ${BASE_PATH}/:id      -> fetch a single reports record by id
export const getById = (id) => axiosClient.get(`${BASE_PATH}/${id}`);

// TODO: POST ${BASE_PATH}          -> create a new reports record
export const create = (payload) => axiosClient.post(BASE_PATH, payload);

// TODO: PUT  ${BASE_PATH}/:id      -> update an existing reports record
export const update = (id, payload) => axiosClient.put(`${BASE_PATH}/${id}`, payload);

// TODO: DELETE ${BASE_PATH}/:id    -> delete a reports record
export const remove = (id) => axiosClient.delete(`${BASE_PATH}/${id}`);
