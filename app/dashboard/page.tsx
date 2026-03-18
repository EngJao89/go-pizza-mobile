import { useEffect, useMemo, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { router, type Href } from "expo-router";
import CardMenu from "@/components/CardMenu";
import ListHeader from "@/components/ListHeader";
import FooterTabs from "@/components/FooterTabs";
import api from "@/lib/axios";
import type { Pizza } from "@/types/pizza";
import { styles } from "./_styles";

export default function DashboardPage() {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

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

  const filteredPizzas = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return pizzas;
    return pizzas.filter((pizza) =>
      pizza.name.toLowerCase().includes(term)
    );
  }, [pizzas, search]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          padding: 24,
        }}
      >
        <Text style={{ color: "#B83341", textAlign: "center" }}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ListHeader search={search} onChangeSearch={setSearch} userName="João" />
      <FlatList
        data={filteredPizzas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CardMenu
            pizza={item}
            onPress={() => router.push(`/details/${item.id}` as Href)}
          />
        )}
        contentContainerStyle={styles.listContent}
      />
      <FooterTabs ordersCount={1} />
    </View>
  );
}
