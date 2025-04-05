import { z } from "zod";

export const doctorSignUpSchema = z.object({
  email: z
    .string({ message: "Email é obrigatório" })
    .email({ message: "Email invalido" }),
  password: z
    .string({ message: "Senha é obrigatória" })
    .min(8, "Senha muito curta"),
  passwordConfirm: z
    .string({ message: "Por favor confirme a senha" })
    .min(8, "Senha muito curta"),
  firstName: z.string({ message: "Nome é obrigatório" }),
  lastName: z.string({ message: "Sobrenome é obrigatório" }),
  phone: z.string({ message: "Telefone é obrigatório" }),
  radius: z.number().int().positive(),
  address: z.object({
    street: z.string({ message: "Rua é obrigatória" }),
    number: z.string({ message: "Número é obrigatório" }).min(1),
    city: z.string({ message: "Cidade é obrigatória" }),
    state: z.string({ message: "Estado é obrigatório" }),
    zipCode: z.string({ message: "CEP é obrigatório" }),
    complement: z.string().optional(),
    addressName: z.string({
      message: "É obrigatorio informar o nome do endereço",
    }),
    location: z
      .object({
        latitude: z.string(),
        longitude: z.string(),
      })
      .optional(),
  }),
  isAttendingAddressSameAsAddress: z.boolean(),
  licenseNumber: z.string({ message: "Numero do CRMV é obrigatorio" }),
  attendingAddress: z
    .object({
      street: z.string({ message: "Rua é obrigatória" }),
      number: z.string({ message: "Número é obrigatório" }).min(1),
      city: z.string({ message: "Cidade é obrigatória" }),
      state: z.string({ message: "Estado é obrigatório" }),
      zipCode: z.string({ message: "CEP é obrigatório" }),
      complement: z.string().optional(),
      addressName: z.string(),
      location: z
        .object({
          latitude: z.string(),
          longitude: z.string(),
        })
        .optional(),
    })
    .optional(),
});

export type DoctorSignUpFormData = z.infer<typeof doctorSignUpSchema>;

export const userSignUpSchema = z.object({
  email: z
    .string({ message: "Email é obrigatório" })
    .email({ message: "Email invalido" }),
  password: z
    .string({ message: "Senha é obrigatória" })
    .min(8, "Senha muito curta"),
  passwordConfirm: z
    .string({ message: "Por favor confirme a senha" })
    .min(8, "Senha muito curta"),
  firstName: z.string({ message: "Nome é obrigatório" }),
  lastName: z.string({ message: "Sobrenome é obrigatório" }),
  phone: z.string({ message: "Telefone é obrigatório" }),
  address: z.object({
    street: z.string({ message: "Rua é obrigatória" }),
    number: z.string({ message: "Número é obrigatório" }).min(1),
    city: z.string({ message: "Cidade é obrigatória" }),
    state: z.string({ message: "Estado é obrigatório" }),
    zipCode: z.string({ message: "CEP é obrigatório" }),
    complement: z.string().optional(),
    addressName: z.string({ message: "O endereço precisa ter um nome" }),
    location: z
      .object({
        latitude: z.string(),
        longitude: z.string(),
      })
      .optional(),
  }),
});

export type UserSignUpFormData = z.infer<typeof userSignUpSchema>;
