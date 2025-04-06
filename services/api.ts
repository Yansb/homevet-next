import { useAuthStore } from "@/stores/authStore";
import axios from "axios";

export const api = axios.create({
  baseURL: "https://homevet.fly.dev",
});

export const apiWithAuth = axios.create({
  baseURL: "https://homevet.fly.dev",
});

apiWithAuth.interceptors.request.use(async (config) => {
  const token = await useAuthStore.getState().firebaseUser?.getIdToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
