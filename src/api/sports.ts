import { api } from './client';

export async function fetchSports(params?: { q?: string; category?: string }) {
  const { data } = await api.get('/sports', { params });
  return data?.data;
}

export async function fetchSportCategories() {
  const { data } = await api.get('/sports/categories');
  return data?.data?.categories || [];
}

