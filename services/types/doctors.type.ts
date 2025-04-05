import { z } from "zod";

export const DoctorResponseSchema = z.object({
  id: z.string().uuid(),
  licenseNumber: z.string(),
  serviceRadius: z.number(),
  name: z.string(),
  email: z.string().email(),
  phoneNumber: z.string(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zipCode: z.string(),
    addressName: z.string(),
    complement: z.string().optional(),
  }),
  specialties: z.array(z.string()),
});

export type GetNearbyDoctorsResponse = z.infer<typeof DoctorResponseSchema>;
