import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native";
import { router, type Href } from "expo-router";
import CardMenu from "@/components/CardMenu";
import ListHeader from "@/components/ListHeader";
import api from "@/lib/axios";
import type { Pizza } from "@/types/pizza";

export default function DashboardPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    async function fetchPizzas() {
      try {
        setError(null);
        const { data } = await api.get<Pizza[]>("api/pizza-flavors");
        if (!cancelled) setPizzas(Array.isArray(data) ? data : []);
      } catch {
        if (!cancelled) {
          setError("Não foi possível carregar os sabores.");
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchPizzas();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 24 }}>
        <Text style={{ color: "#B83341", textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ListHeader />
      <FlatList
        data={pizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardMenu
            pizza={item}
            onPress={() => router.push(`/details/${item.id}` as Href)}
          />
        )}
        contentContainerStyle={{ paddingBottom: 24 }}
      />
    </View>
  );
}
