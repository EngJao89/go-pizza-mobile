import { useCallback, useMemo, useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { router, type Href } from "expo-router";
import CardProduct from "@/components/CardProduct";
import ListHeader from "@/components/ListHeader";
import api from "@/lib/axios";
import {
  mapProductsResponse,
  productSearchText,
} from "@/lib/map-products-response";
import type { Product } from "@/types/product";
import { useAuth } from "@/contexts/AuthContext";
import { styles } from "./_styles";

export default function ProductsPage() {
  const { userName } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const firstLoadRef = useRef(true);

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      if (firstLoadRef.current) {
        setLoading(true);
      }

      async function fetchProducts() {
        try {
          setError(null);
          const { data } = await api.get("api/products");
          if (!cancelled) {
            setProducts(mapProductsResponse(data));
          }
        } catch {
          if (!cancelled) {
            setError("Não foi possível carregar as bebidas.");
            setProducts([]);
          }
        } finally {
          if (!cancelled) {
            setLoading(false);
            firstLoadRef.current = false;
          }
        }
      }

      fetchProducts();
      return () => {
        cancelled = true;
      };
    }, [])
  );

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return products;
    return products.filter((product) => productSearchText(product).includes(term));
  }, [products, search]);

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
      <ListHeader
        search={search}
        onChangeSearch={setSearch}
        userName={userName || "Visitante"}
        searchPlaceholder="Buscar bebida"
      />
      {filteredProducts.length === 0 ? (
        <View style={styles.emptyWrap}>
          <Text style={styles.emptyTitle}>Nenhuma bebida encontrada</Text>
          <Text style={styles.emptySubtitle}>
            {search.trim()
              ? "Tente outro termo na busca."
              : "Cadastre bebidas pelo menu lateral."}
          </Text>
        </View>
      ) : (
        <FlatList
          style={styles.list}
          data={filteredProducts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <CardProduct
              product={item}
              onPress={() =>
                router.push(`/product-details/${item.id}` as Href)
              }
            />
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
}
