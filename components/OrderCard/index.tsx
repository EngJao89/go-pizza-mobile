import { Image } from "expo-image";
import { Text, View } from "react-native";
import type { OrderItem, OrderStatus } from "@/types/order";
import { baseURL } from "@/lib/axios";
import { styles, statusStyles } from "./styles";

type OrderCardProps = Readonly<{
  order: OrderItem;
  showRightBorder: boolean;
}>;

function getImageUri(imageUrl: string): string {
  if (imageUrl.startsWith("http")) return imageUrl;
  const path = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
  return `${baseURL}${path}`;
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  ready: "Pronto",
  preparing: "Preparando",
  delivered: "Entregue",
};

export default function OrderCard({ order, showRightBorder }: OrderCardProps) {
  const uri = getImageUri(order.imageUrl);
  const statusKey = order.status;
  const pill = statusStyles[statusKey];

  return (
    <View
      style={[
        styles.cell,
        showRightBorder && styles.cellRightBorder,
      ]}
    >
      <Image source={{ uri }} style={styles.image} contentFit="cover" />
      <Text style={styles.name} numberOfLines={2}>
        {order.pizzaName}
      </Text>
      <Text style={styles.meta}>
        Mesa {order.tableNumber} • Qnt: {order.quantity}
      </Text>
      <View style={[styles.statusPill, pill.container]}>
        <Text style={[styles.statusText, pill.text]}>{STATUS_LABEL[statusKey]}</Text>
      </View>
    </View>
  );
}
