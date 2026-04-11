import { useState } from "react";
import { FlatList, View } from "react-native";
import FooterTabs from "@/components/FooterTabs";
import OrderCard from "@/components/OrderCard";
import OrdersEmptyState from "@/components/OrdersEmptyState";
import OrdersHeader from "@/components/OrdersHeader";
import { MOCK_ORDERS } from "@/data/mockOrders";
import type { OrderItem } from "@/types/order";
import { useAuth } from "@/contexts/AuthContext";
import { styles } from "./styles";

export default function OrdersPage() {
  const { isAdmin } = useAuth();
  const [orders] = useState<OrderItem[]>(MOCK_ORDERS);

  return (
    <View style={styles.screen}>
      <OrdersHeader />
      {orders.length === 0 ? (
        <OrdersEmptyState />
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          numColumns={2}
          scrollEnabled
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.listContent}
          renderItem={({ item, index }) => (
            <OrderCard
              order={item}
              showRightBorder={index % 2 === 0}
            />
          )}
        />
      )}
      <FooterTabs ordersCount={orders.length} isAdmin={isAdmin} />
    </View>
  );
}
