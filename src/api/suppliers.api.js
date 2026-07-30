import axiosClient from './axiosClient';

/**
 * suppliers.api.js
 * -----------------------------------------------------------------------
 * Thin HTTP layer for the "suppliers" domain. Every function here maps 1:1
 * to an Express route and returns the raw axios response promise.
 * No business logic, no data shaping — that belongs in
 * `services/suppliers.service.js`.
 *
 * Base path (planned): /api/suppliers
 */

const BASE_PATH = '/suppliers';

// TODO: GET  ${BASE_PATH}          -> list all suppliers (supports query params: page, pageSize, filters, sort)
export const getAll = (params) => axiosClient.get(BASE_PATH, { params });

// TODO: GET  ${BASE_PATH}/:id      -> fetch a single suppliers record by id
export const getById = (id) => axiosClient.get(`${BASE_PATH}/${id}`);

// TODO: POST ${BASE_PATH}          -> create a new suppliers record
export const create = (payload) => axiosClient.post(BASE_PATH, payload);

// TODO: PUT  ${BASE_PATH}/:id      -> update an existing suppliers record
export const update = (id, payload) => axiosClient.put(`${BASE_PATH}/${id}`, payload);

// TODO: DELETE ${BASE_PATH}/:id    -> delete a suppliers record
export const remove = (id) => axiosClient.delete(`${BASE_PATH}/${id}`);
