import axiosClient from './axiosClient';

/**
 * customers.api.js
 * -----------------------------------------------------------------------
 * Thin HTTP layer for the "customers" domain. Every function here maps 1:1
 * to an Express route and returns the raw axios response promise.
 * No business logic, no data shaping — that belongs in
 * `services/customers.service.js`.
 *
 * Base path (planned): /api/customers
 */

const BASE_PATH = '/customers';

// TODO: GET  ${BASE_PATH}          -> list all customers (supports query params: page, pageSize, filters, sort)
export const getAll = (params) => axiosClient.get(BASE_PATH, { params });

// TODO: GET  ${BASE_PATH}/:id      -> fetch a single customers record by id
export const getById = (id) => axiosClient.get(`${BASE_PATH}/${id}`);

// TODO: POST ${BASE_PATH}          -> create a new customers record
export const create = (payload) => axiosClient.post(BASE_PATH, payload);

// TODO: PUT  ${BASE_PATH}/:id      -> update an existing customers record
export const update = (id, payload) => axiosClient.put(`${BASE_PATH}/${id}`, payload);

// TODO: DELETE ${BASE_PATH}/:id    -> delete a customers record
export const remove = (id) => axiosClient.delete(`${BASE_PATH}/${id}`);
