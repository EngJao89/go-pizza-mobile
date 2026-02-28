import { z } from "zod";

const onlyDigits = (value: string) => value.replace(/\D/g, "");

export const signupSchema = z.object({
  email: z
    .string()
    .min(1, "E-mail é obrigatório")
    .pipe(z.email("E-mail inválido")),
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z
    .string()
    .min(1, "Telefone é obrigatório")
    .refine((v) => onlyDigits(v).length >= 10, "Telefone inválido"),
  password: z.string().min(6, "Senha deve ter no mínimo 6 caracteres"),
  birthday: z
    .string()
    .min(1, "Data de nascimento é obrigatória")
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Use o formato AAAA-MM-DD"),
  cpf: z
    .string()
    .min(1, "CPF é obrigatório")
    .refine((v) => onlyDigits(v).length === 11, "CPF deve ter 11 dígitos"),
});

export type SignupFormData = z.infer<typeof signupSchema>;
