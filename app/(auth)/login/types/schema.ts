import { z } from "zod";

export const loginFormSchema = z.object({
  email: z.string({ message: "Email é obrigatório" }).email(),
  password: z
    .string({ message: "Senha é obrigatória" })
    .min(8, "Senha muito curta"),
});

export type LoginFormSchema = z.infer<typeof loginFormSchema>;
