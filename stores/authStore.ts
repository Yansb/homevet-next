import { auth } from "@/config/firebaseConfig";
import { login } from "@/services/authService";
import { User } from "firebase/auth";
import {
  UseMutationResult,
  useMutation,
  QueryClient,
} from "@tanstack/react-query";
import { create } from "zustand";
import { useUserStore } from "./userStore";

interface LoginCredentials {
  email: string;
  password: string;
}

type AuthState = {
  firebaseUser: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  initialize: () => () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  firebaseUser: null,
  loading: true,
  setUser: (user) => set({ firebaseUser: user }),
  setLoading: (loading) => set({ loading }),
  logout: async () => {
    await auth.signOut();
    set({ firebaseUser: null });
    useUserStore.getState().clearUser();
  },
  initialize: () => {
    const queryClient = new QueryClient();
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user) {
        queryClient.invalidateQueries({ queryKey: ["user"] });
      }
      set({ firebaseUser: user, loading: false });
    });

    return unsubscribe;
  },
}));

export const useLogin = (): UseMutationResult<
  User,
  Error,
  LoginCredentials
> => {
  const setUser = useAuthStore((state) => state.setUser);

  return useMutation({
    mutationFn: async ({ email, password }: LoginCredentials) => {
      const user = await login(email, password);
      setUser(user);
      return user;
    },
  });
};
