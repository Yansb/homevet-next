import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api, apiWithAuth } from "./api";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import { useUserStore } from "@/stores/userStore";

interface Location {
  latitude: string;
  longitude: string;
}

interface Address {
  street: string;
  number: string;
  city: string;
  state: string;
  addressName: string;
  zipCode: string;
  complement?: string;
  location?: Location;
}

export interface CreateUserDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  address: Address;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  roles: string[];
  profilePicture: string;
}

interface AddressResponse {
  id: string;
  street: string;
  number: string;
  zipCode: string;
  state: string;
  city: string;
  addressName: string;
  complement?: string;
}

export const useCreateUser = () => {
  return useMutation({
    mutationFn: async (data: CreateUserDTO) => {
      const response = await api.post("/user", data);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar conta. Tente novamente.");
      console.error("Error creating user:", error);
    },
  });
};

export const useGetLoggedUser = () => {
  const user = useAuthStore((state) => state.firebaseUser);
  const setUser = useUserStore((state) => state.setUser);
  const queryClient = useQueryClient();

  return useQuery<UserResponse, Error>({
    queryFn: async () => {
      const response = await apiWithAuth.get<UserResponse>("/user/me");
      setUser(response.data);
      return response.data;
    },
    queryKey: ["user"],
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
    enabled: !!user,
    refetchOnMount: false,
    retry: false,
    gcTime: 0,
  });
};

export const useConfirmProfilePictureMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (key: string) => {
      const response = await apiWithAuth.put(`/user/confirm-profile/${key}`);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Imagem atualizada com sucesso.");
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
    onError: (error) => {
      toast.error("Erro ao criar atualizar imagem. Tente novamente.");
    },
  });
};
