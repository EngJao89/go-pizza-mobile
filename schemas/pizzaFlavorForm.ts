import { z } from "zod";

function parseMoneyString(s: string): number {
  const n = Number(s.trim().replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
}

export const pizzaFlavorFormSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  description: z
    .string()
    .max(60, "Máximo 60 caracteres"),
  priceP: z
    .string()
    .min(1, "Informe o preço P")
    .refine((s) => parseMoneyString(s) > 0, "Preço P inválido"),
  priceM: z
    .string()
    .min(1, "Informe o preço M")
    .refine((s) => parseMoneyString(s) > 0, "Preço M inválido"),
  priceG: z
    .string()
    .min(1, "Informe o preço G")
    .refine((s) => parseMoneyString(s) > 0, "Preço G inválido"),
});

export type PizzaFlavorFormData = z.infer<typeof pizzaFlavorFormSchema>;

export function formToSizesAndPrices(data: PizzaFlavorFormData): Record<string, number> {
  return {
    P: parseMoneyString(data.priceP),
    M: parseMoneyString(data.priceM),
    G: parseMoneyString(data.priceG),
  };
}
