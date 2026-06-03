import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Colors } from "@/constants/theme";
import api, { baseURL } from "@/lib/axios";
import {
  mapProductResponse,
  productDescription,
} from "@/lib/map-products-response";
import type { Product } from "@/types/product";
import { priceFormatter } from "@/utils/currencyFormater";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams, type Href } from "expo-router";
import DrawerMenuButton from "@/components/DrawerMenuButton";
import { styles } from "../details/_styles";

function leaveProductDetailsScreen() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/products/page" as Href);
  }
}

function getImageUri(imageUrl: string): string {
  if (imageUrl.startsWith("http")) return imageUrl;
  const path = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
  return `${baseURL}${path}`;
}

export default function ProductDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tableNumber, setTableNumber] = useState("1");
  const [quantity, setQuantity] = useState("1");

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("ID não informado.");
      return;
    }
    let cancelled = false;
    async function fetchProduct() {
      try {
        setError(null);
        const { data } = await api.get(`api/products/${id}`);
        if (!cancelled) {
          const mapped = mapProductResponse(data);
          if (!mapped) {
            setError("Bebida não encontrada.");
            setProduct(null);
          } else {
            setProduct(mapped);
          }
        }
      } catch {
        if (!cancelled) setError("Não foi possível carregar a bebida.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchProduct();
    return () => {
      cancelled = true;
    };
  }, [id]);

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center" }]}>
        <ActivityIndicator size="large" color={Colors.RED_2} />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View
        style={[
          styles.container,
          { justifyContent: "center", alignItems: "center", padding: 24 },
        ]}
      >
        <Text style={{ color: Colors.RED_1, textAlign: "center", marginBottom: 16 }}>
          {error ?? "Bebida não encontrada."}
        </Text>
        <TouchableOpacity onPress={leaveProductDetailsScreen}>
          <Text style={{ color: Colors.RED_2, fontWeight: "600" }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const imageUri = getImageUri(product.imageUrl);
  const parsedQuantity = Number.parseInt(quantity || "1", 10) || 1;
  const total = product.valor * parsedQuantity;
  const description = productDescription(product);

  return (
    <View style={styles.container}>
      <View style={styles.backContent}>
        <View style={styles.backRow}>
          <TouchableOpacity style={styles.backButton} onPress={leaveProductDetailsScreen}>
            <Ionicons name="arrow-back" size={22} color={Colors.WHITE} />
          </TouchableOpacity>
          <DrawerMenuButton />
        </View>
      </View>

      <View style={styles.header}>
        <View style={styles.pizzaWrapper}>
          <Image source={{ uri: imageUri }} style={styles.image} contentFit="cover" />
        </View>
      </View>

      <ScrollView
        style={styles.content}
        contentContainerStyle={{ paddingBottom: 32 }}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.title}>{product.titulo}</Text>
        <Text style={styles.subtitle}>{product.marca}</Text>
        <Text style={styles.subtitle}>{description}</Text>

        <Text style={styles.sectionTitle}>Valor unitário</Text>
        <Text style={[styles.totalValue, { textAlign: "center", marginBottom: 16 }]}>
          R$ {priceFormatter.format(product.valor)}
        </Text>

        {product.conteudo && product.conteudo !== description ? (
          <>
            <Text style={styles.sectionTitle}>Conteúdo</Text>
            <Text style={[styles.subtitle, { marginBottom: 16 }]}>{product.conteudo}</Text>
          </>
        ) : null}

        <View style={styles.fieldsRow}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Número da mesa</Text>
            <TextInput
              style={styles.fieldInput}
              keyboardType="number-pad"
              value={tableNumber}
              onChangeText={setTableNumber}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Quantidade</Text>
            <TextInput
              style={styles.fieldInput}
              keyboardType="number-pad"
              value={quantity}
              onChangeText={setQuantity}
            />
          </View>
        </View>

        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total:</Text>
          <Text style={styles.totalValue}>R$ {priceFormatter.format(total)}</Text>
        </View>

        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.9}
          onPress={() => {
            // confirmação futura
          }}
        >
          <Text style={styles.confirmButtonText}>Confirmar pedido</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
