import { api } from './client';

export async function fetchMyProfile() {
  const { data } = await api.get('/profiles/me');
  return data?.data?.profile;
}

export async function updateProfile(profileId: string, payload: any) {
  const { data } = await api.patch(`/profiles/${profileId}`, { profile: payload, sports: payload?.sports });
  return data?.data?.profile;
}

export async function completeProfileSetup(profileId: string, payload: any) {
  const { data } = await api.patch(`/profiles/${profileId}/complete_setup`, { profile: payload, sports: payload?.sports });
  return data?.data?.profile;
}

export async function searchProfiles(params: { q?: string; location?: string; sport_id?: string; user_type?: string; offset?: number }) {
  const { data } = await api.get('/profiles/search', { params });
  return data?.data;
}

