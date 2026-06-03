import api from "@/lib/axios";
import { slugifyImageName } from "@/lib/imageUpload";
import type { Product } from "@/types/product";

export type CreateProductPayload = Readonly<{
  marca: string;
  titulo: string;
  descricao: string;
  conteudo: string;
  valor: number;
}>;

export async function createProductWithImage(
  payload: CreateProductPayload,
  imageUri: string,
  mimeType: string
): Promise<Product> {
  const ext = mimeType.includes("png") ? "png" : "jpg";
  const fileName = `${slugifyImageName(payload.titulo)}.${ext}`;

  const form = new FormData();
  form.append("imagem", {
    uri: imageUri,
    name: fileName,
    type: mimeType,
  } as unknown as Blob);

  const { data } = await api.post<Product>("api/products/with-image", form, {
    params: {
      marca: payload.marca,
      titulo: payload.titulo,
      descricao: payload.descricao,
      conteudo: payload.conteudo,
      valor: payload.valor,
    },
  });

  return data;
}
