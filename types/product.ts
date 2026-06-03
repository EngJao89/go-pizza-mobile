export type Product = Readonly<{
  id: string;
  marca: string;
  titulo: string;
  /** API pode retornar `descriciao` (typo legado). */
  descricao?: string;
  descriciao?: string;
  conteudo: string;
  valor: number;
  /** API retorna `imagemUrl`; normalizamos para `imageUrl` no mapper. */
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}>;
