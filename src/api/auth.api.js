import axiosClient from './axiosClient';

/**
 * auth.api.js
 * -----------------------------------------------------------------------
 * Thin HTTP layer for authentication. No business logic, no token
 * persistence here — that belongs in `services/auth.service.js`.
 *
 * Base path (planned): /api/auth
 */

const BASE_PATH = '/auth';

// TODO: POST /api/auth/login          -> { email, password } -> { user, token }
export const login = (credentials) => axiosClient.post(`${BASE_PATH}/login`, credentials);

// TODO: POST /api/auth/logout         -> invalidate current session/token
export const logout = () => axiosClient.post(`${BASE_PATH}/logout`);

// TODO: GET  /api/auth/me             -> fetch the currently authenticated user
export const getCurrentUser = () => axiosClient.get(`${BASE_PATH}/me`);

// TODO: POST /api/auth/refresh        -> exchange refresh token for a new access token
export const refreshToken = (refreshToken) =>
  axiosClient.post(`${BASE_PATH}/refresh`, { refreshToken });

// TODO: POST /api/auth/forgot-password -> { email } -> send reset link
export const forgotPassword = (email) =>
  axiosClient.post(`${BASE_PATH}/forgot-password`, { email });

// TODO: POST /api/auth/reset-password  -> { token, newPassword }
export const resetPassword = (payload) =>
  axiosClient.post(`${BASE_PATH}/reset-password`, payload);
