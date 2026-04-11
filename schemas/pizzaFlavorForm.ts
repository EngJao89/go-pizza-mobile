import { z } from "zod";
import type { Pizza } from "@/types/pizza";

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

/** Valores exibidos no formulário (ex.: `59,90`), compatíveis com `parseMoneyString`. */
export function formatDecimalForForm(value: number): string {
  return value.toFixed(2).replace(".", ",");
}

export function pizzaToFlavorFormDefaults(pizza: Pizza): PizzaFlavorFormData {
  const sp = pizza.sizesAndPrices ?? {};
  return {
    name: pizza.name ?? "",
    description: pizza.description ?? "",
    priceP: sp.P == null ? "" : formatDecimalForForm(sp.P),
    priceM: sp.M == null ? "" : formatDecimalForForm(sp.M),
    priceG: sp.G == null ? "" : formatDecimalForForm(sp.G),
  };
}
