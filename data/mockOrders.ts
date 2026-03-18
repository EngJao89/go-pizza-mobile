import type { OrderItem } from "@/types/order";

/** Exemplo visual; troque por dados da API (`GET /orders` etc.). Use `[]` para ver o estado vazio. */
export const MOCK_ORDERS: OrderItem[] = [
  {
    id: "1",
    pizzaName: "4 Queijos",
    imageUrl:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=200&h=200&fit=crop",
    tableNumber: "01",
    quantity: 1,
    status: "ready",
  },
  {
    id: "2",
    pizzaName: "Gauchesca",
    imageUrl:
      "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=200&h=200&fit=crop",
    tableNumber: "01",
    quantity: 1,
    status: "preparing",
  },
  {
    id: "3",
    pizzaName: "Margherita",
    imageUrl:
      "https://images.unsplash.com/photo-1604382354936-07c5d9983bd3?w=200&h=200&fit=crop",
    tableNumber: "01",
    quantity: 1,
    status: "delivered",
  },
];
