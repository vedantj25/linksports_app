import axios from 'axios';
import * as Linking from 'expo-linking';
import * as SecureStore from 'expo-secure-store';

const expoConfig = require('../../app.json');
const extra = expoConfig?.expo?.extra || {};

const API_BASE_URL = (__DEV__ ? extra.apiBaseUrlDev : extra.apiBaseUrlProd) || 'http://localhost:3000/api/v1';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000
});

api.interceptors.request.use(async (config) => {
  const token = await SecureStore.getItemAsync('accessToken');
  if (token) {
    config.headers = config.headers || {};
    (config.headers as any).Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (r) => r,
  async (error) => {
    // No refresh endpoint currently; on 401, redirect to login flow
    if (error?.response?.status === 401) {
      await SecureStore.deleteItemAsync('accessToken');
      // optional: broadcast an event or navigate using a global ref
    }
    return Promise.reject(error);
  }
);

export type ApiSuccess<T> = { success: true; data: T; message?: string };
export type ApiError = { success: false; error: { code?: string; message: string; details?: any } };

