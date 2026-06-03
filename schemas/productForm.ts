import { z } from "zod";

function parseMoneyString(s: string): number {
  const n = Number(s.trim().replace(",", "."));
  return Number.isFinite(n) ? n : NaN;
}

export const productFormSchema = z.object({
  marca: z.string().min(1, "Marca é obrigatória"),
  titulo: z.string().min(1, "Título é obrigatório"),
  descricao: z.string().min(1, "Descrição é obrigatória"),
  conteudo: z.string().min(1, "Conteúdo é obrigatório"),
  valor: z
    .string()
    .min(1, "Informe o valor")
    .refine((s) => parseMoneyString(s) > 0, "Valor inválido"),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

export function formToProductValor(data: ProductFormData): number {
  return parseMoneyString(data.valor);
}
