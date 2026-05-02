import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import FooterTabs from "@/components/FooterTabs";
import OrderCard from "@/components/OrderCard";
import OrdersEmptyState from "@/components/OrdersEmptyState";
import OrdersHeader from "@/components/OrdersHeader";
import api from "@/lib/axios";
import { mapOrdersResponseToItems } from "@/lib/map-orders-response";
import type { OrderItem } from "@/types/order";
import { useAuth } from "@/contexts/AuthContext";
import { styles } from "./styles";

export default function OrdersPage() {
  const { isAdmin } = useAuth();
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const firstLoadRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      if (firstLoadRef.current) {
        setLoading(true);
      }

      async function fetchOrders() {
        try {
          setError(null);
          const { data } = await api.get("api/orders");
          if (!cancelled) {
            setOrders(mapOrdersResponseToItems(data));
          }
        } catch {
          if (!cancelled) {
            setError("Não foi possível carregar os pedidos.");
            setOrders([]);
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
            firstLoadRef.current = false;
          }
        }
      }

      fetchOrders();
      return () => {
        cancelled = true;
      };
    }, [])
  );

  if (loading) {
    return (
      <View style={[styles.screen, styles.centered]}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.screen, styles.centered, styles.errorPad]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

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
