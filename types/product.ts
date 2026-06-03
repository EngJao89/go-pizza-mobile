export type Product = Readonly<{
  id: string;
  marca: string;
  titulo: string;
  /** API retorna com typo `descriciao` em alguns registros. */
  descricao?: string;
  descriciao?: string;
  conteudo: string;
  valor: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}>;
