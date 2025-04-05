import { auth } from "@/config/firebaseConfig";
import { login } from "@/services/authService";
import { User } from "firebase/auth";
import { UseMutationResult, useMutation } from "@tanstack/react-query";
import { create } from "zustand";

interface LoginCredentials {
  email: string;
  password: string;
}

type AuthState = {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => Promise<void>;
  initialize: () => () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),
  logout: async () => {
    await auth.signOut();
    set({ user: null });
  },
  initialize: () => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      set({ user, loading: false });
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
