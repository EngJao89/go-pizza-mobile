export type Pizza = {
  id: string;
  name: string;
  description: string;
  availableOptions: string[];
  sizesAndPrices: Record<string, number>;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
};
