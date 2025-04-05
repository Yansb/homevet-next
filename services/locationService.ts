import { useQuery } from "@tanstack/react-query";
import { api } from "./api";
import { GetLocationByCepResponse } from "./types/location.type";

export async function getLocationByCep(cep: string) {}

export function useGetLocationByCepQuery(cep: string | undefined) {
  return useQuery({
    queryFn: async () => {
      const response = await api.get<GetLocationByCepResponse>(
        `/location/${cep}`,
      );
      return response.data;
    },
    queryKey: ["LocationByCep", cep],
    enabled: !!cep && cep.length === 8,
  });
}
