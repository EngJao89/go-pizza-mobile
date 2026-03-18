export type OrderStatus = "ready" | "preparing" | "delivered";

export type OrderItem = Readonly<{
  id: string;
  pizzaName: string;
  imageUrl: string;
  tableNumber: string;
  quantity: number;
  status: OrderStatus;
}>;
