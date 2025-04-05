import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";

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
  address: AddressResponse[];
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
  const user = useAuthStore((state) => state.user);

  return useQuery<UserResponse>({
    queryFn: async () => {
      const token = await user?.getIdToken();
      const response = await api.get<UserResponse>("/user/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    queryKey: ["user"],
    staleTime: 1000 * 60 * 60 * 2, // 2 hours
    enabled: !!user,
  });
};
