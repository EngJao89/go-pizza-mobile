import type { Product } from "@/types/product";

function asRecord(v: unknown): Record<string, unknown> | null {
  if (v && typeof v === "object" && !Array.isArray(v)) {
    return v as Record<string, unknown>;
  }
  return null;
}

function pickString(obj: Record<string, unknown>, keys: string[]): string | null {
  for (const key of keys) {
    const value = obj[key];
    if (typeof value === "string" && value.length > 0) return value;
  }
  return null;
}

function unwrapProductsPayload(data: unknown): unknown[] {
  if (Array.isArray(data)) return data;

  const root = asRecord(data);
  if (!root) return [];

  if (Array.isArray(root.content)) return root.content;

  for (const key of ["data", "products", "results", "items"]) {
    const value = root[key];
    if (Array.isArray(value)) return value;
    const nested = asRecord(value);
    if (nested && Array.isArray(nested.content)) return nested.content;
    if (nested && Array.isArray(nested.data)) return nested.data;
  }

  return [];
}

function normalizeProduct(raw: unknown): Product | null {
  const o = asRecord(raw);
  if (!o) return null;

  const id = pickString(o, ["id"]);
  const titulo = pickString(o, ["titulo", "title", "name"]);
  const imageUrl = pickString(o, ["imageUrl", "imagemUrl", "image_url", "imagem_url"]);
  if (!id || !titulo || !imageUrl) return null;

  const valorRaw = o.valor;
  const valor =
    typeof valorRaw === "number"
      ? valorRaw
      : typeof valorRaw === "string"
        ? Number(valorRaw.replace(",", "."))
        : Number.NaN;

  return {
    id,
    marca: pickString(o, ["marca", "brand"]) ?? "",
    titulo,
    descricao: pickString(o, ["descricao", "description"]) ?? undefined,
    descriciao: pickString(o, ["descriciao"]) ?? undefined,
    conteudo: pickString(o, ["conteudo", "content"]) ?? "",
    valor: Number.isFinite(valor) ? valor : 0,
    imageUrl,
    createdAt: pickString(o, ["createdAt", "created_at"]) ?? "",
    updatedAt: pickString(o, ["updatedAt", "updated_at"]) ?? "",
  };
}

export function mapProductsResponse(data: unknown): Product[] {
  return unwrapProductsPayload(data)
    .map(normalizeProduct)
    .filter((product): product is Product => product !== null);
}

export function mapProductResponse(data: unknown): Product | null {
  const root = asRecord(data);
  if (root) {
    const nested = asRecord(root.data) ?? asRecord(root.product);
    if (nested) return normalizeProduct(nested);
  }
  return normalizeProduct(data);
}

export function productDescription(product: Product): string {
  return product.descricao ?? product.descriciao ?? product.conteudo;
}

export function productSearchText(product: Product): string {
  return [
    product.titulo,
    product.marca,
    product.conteudo,
    productDescription(product),
  ]
    .join(" ")
    .toLowerCase();
}
