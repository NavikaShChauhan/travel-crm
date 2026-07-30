import axios from 'axios';
import { STORAGE_KEYS } from '@constants/app';

/**
 * axiosClient
 * -----------------------------------------------------------------------
 * The one Axios instance used by every `*.api.js` file. Nothing outside
 * `src/api/` should import axios directly — that boundary is what lets
 * us swap transport (e.g. add retries, change base URL per environment,
 * move to a GraphQL client) without touching services or components.
 *
 * TODO (backend integration):
 * - Point baseURL at the Express API (via VITE_API_BASE_URL)
 * - Attach the auth token from AuthContext/storage in the request interceptor
 * - Handle 401 responses globally (refresh token or force logout)
 * - Normalize error shape in the response interceptor so services/components
 *   only ever deal with one error format
 */
const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.request.use((config) => {
  // TODO: replace with real token retrieval once auth endpoints exist
  const token = localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // TODO: central 401/403 handling, toast dispatch, error normalization
    return Promise.reject(error);
  }
);

export default axiosClient;
