import { useMutation, useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { toast } from "sonner";
import { GetNearbyDoctorsResponse } from "./types/doctors.type";

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

export interface createDoctorDTO {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  radius: number;
  licenseNumber: string;
  isAttendingAddressSameAsAddress: boolean;
  attendingAddress?: Address;
  address: Address;
}

export async function createDoctor(data: createDoctorDTO) {
  const response = await api.post("/doctor", data);
  return response.data;
}

export const useCreateDoctorMutation = () => {
  return useMutation({
    mutationFn: (data: createDoctorDTO) => createDoctor(data),
    onSuccess: () => {
      toast.success("Conta criada com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar conta. Tente novamente.");
      console.error("Error creating user:", error);
    },
  });
};

export const useGetNearbyDoctorsByLocation = (
  lat: string | null,
  lng: string | null,
) => {
  return useQuery({
    queryFn: async () => {
      const response = await api.get<GetNearbyDoctorsResponse[]>(
        `/location/nearby-doctors`,
        { params: { lat, lng } },
      );
      return response.data;
    },
    queryKey: ["nearby-doctors", lat, lng],
    enabled: lat !== null && lng !== null,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};
