import { create } from 'zustand';
import * as SecureStore from 'expo-secure-store';
import { api } from '../api/client';

type UserType = 'player' | 'coach' | 'club';

export interface AuthUser {
  id: string;
  email: string;
  username?: string;
  user_type: UserType;
  email_verified?: boolean;
  profile_completed?: boolean;
  profile_id?: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: AuthUser | null;
  accessToken: string | null;
  loading: boolean;
  login: (login: string, password: string) => Promise<void>;
  register: (payload: { email: string; password: string; user_type: UserType; first_name?: string; last_name?: string; username?: string; phone?: string }) => Promise<void>;
  logout: () => Promise<void>;
  hydrate: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: null,
  accessToken: null,
  loading: false,

  hydrate: async () => {
    const token = await SecureStore.getItemAsync('accessToken');
    const userJson = await SecureStore.getItemAsync('user');
    const user = userJson ? (JSON.parse(userJson) as AuthUser) : null;
    set({ accessToken: token, user, isAuthenticated: !!token });
  },

  login: async (login, password) => {
    set({ loading: true });
    try {
      const { data } = await api.post('/auth/login', { login, password });
      const token: string = data?.data?.token;
      const user: AuthUser = data?.data?.user;
      if (token) await SecureStore.setItemAsync('accessToken', token);
      await SecureStore.setItemAsync('user', JSON.stringify(user));
      set({ isAuthenticated: true, accessToken: token, user, loading: false });
    } catch (e) {
      set({ loading: false });
      throw e;
    }
  },

  register: async (payload) => {
    set({ loading: true });
    try {
      await api.post('/auth/register', { user: payload });
    } finally {
      set({ loading: false });
    }
  },

  logout: async () => {
    try { await api.post('/auth/logout', {}); } catch { }
    await SecureStore.deleteItemAsync('accessToken');
    await SecureStore.deleteItemAsync('user');
    set({ isAuthenticated: false, user: null, accessToken: null });
  }
}));

