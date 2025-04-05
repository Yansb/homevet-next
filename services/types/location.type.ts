import { z } from "zod";

export const getLocationByCep = z.object({
  cep: z.string(),
  state: z.string().length(2),
  city: z.string(),
  neighborhood: z.string().nullable(),
  street: z.string().nullable(),
  location: z
    .object({
      coordinates: z.object({
        longitude: z.string().nullable(),
        latitude: z.string().nullable(),
      }),
    })
    .nullable(),
});

export type GetLocationByCepResponse = z.infer<typeof getLocationByCep>;
