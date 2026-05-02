import { create } from 'zustand';
import { listenAuthState, type User } from '@repo/auth';


interface AuthState {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  setAuth: (user: User | null, token: string | null) => void;
  setLoading: (loading: boolean) => void;
  initAuthState: () => () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isLoading: true,
  setAuth: (user, token) => set({ user, token, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  initAuthState: () => {
    set({ isLoading: true });
    return listenAuthState(async (user) => {
      if (user) {
        const token = await user.getIdToken();
        set({ user, token, isLoading: false });
        return;
      }
      set({ user: null, token: null, isLoading: false });
    });
  },
}));