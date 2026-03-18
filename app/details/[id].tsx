import { Colors } from "@/constants/theme";
import api, { baseURL } from "@/lib/axios";
import type { Pizza } from "@/types/pizza";
import { priceFormatter } from "@/utils/currencyFormater";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { styles } from "./_styles";

function getImageUri(imageUrl: string): string {
  const path = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
  return `${baseURL}${path}`;
}

export default function PizzaDetailsPage() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [pizza, setPizza] = useState<Pizza | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [tableNumber, setTableNumber] = useState("1");
  const [quantity, setQuantity] = useState("1");

  function toggleOption(option: string) {
    setSelectedOptions((prev) =>
      prev.includes(option) ? prev.filter((o) => o !== option) : [...prev, option]
    );
  }

  useEffect(() => {
    if (!id) {
      setLoading(false);
      setError("ID não informado.");
      return;
    }
    let cancelled = false;
    async function fetchPizza() {
      try {
        setError(null);
        const { data } = await api.get<Pizza>(`api/pizza-flavors/${id}`);
        if (!cancelled) setPizza(data);
      } catch {
        if (!cancelled) setError("Não foi possível carregar a pizza.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    fetchPizza();
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

  if (error || !pizza) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", padding: 24 }]}>
        <Text style={{ color: Colors.RED_1, textAlign: "center", marginBottom: 16 }}>
          {error ?? "Pizza não encontrada."}
        </Text>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={{ color: Colors.RED_2, fontWeight: "600" }}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const imageUri = getImageUri(pizza.imageUrl);

  const sizeOrder = ["P", "M", "G"];
  const sizesAndPrices = sizeOrder
    .filter((s) => s in pizza.sizesAndPrices)
    .map((s) => [s, pizza.sizesAndPrices[s]] as [string, number]);

  const selectedPrice =
    selectedSize && pizza.sizesAndPrices[selectedSize]
      ? pizza.sizesAndPrices[selectedSize]
      : 0;
  const parsedQuantity = Number.parseInt(quantity || "1", 10) || 1;
  const total = selectedPrice * parsedQuantity;

  return (
    <View style={styles.container}>
      <View style={styles.backContent}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={22} color={Colors.WHITE} />
        </TouchableOpacity>
      </View>

      <View style={styles.header}>
        <View style={styles.pizzaWrapper}>
          <Image source={{ uri: imageUri }} style={styles.image} contentFit="cover" />
        </View>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>{pizza.name}</Text>
        <Text style={styles.subtitle}>{pizza.description}</Text>

        <Text style={styles.sectionTitle}>Selecione um tamanho</Text>

        <View style={styles.selectContent}>
          {sizesAndPrices.map(([size, price]) => {
            const isSelected = selectedSize === size;
            return (
              <TouchableOpacity
                key={size}
                style={[styles.sizeButton, isSelected && styles.sizeButtonSelected]}
                onPress={() => setSelectedSize(size)}
                activeOpacity={0.8}
              >
                <Text
                  style={[styles.sizeLabel, isSelected && styles.sizeLabelSelected]}
                >
                  {size === "P" ? "Pequena" : size === "M" ? "Média" : "Grande"}
                </Text>
                <Text
                  style={[styles.sizePrice, isSelected && styles.sizePriceSelected]}
                >
                  {`R$ ${priceFormatter.format(price)}`}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.info}>
          {pizza.availableOptions.map((option) => {
            const isSelected = selectedOptions.includes(option);
            return (
              <TouchableOpacity
                key={option}
                style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                onPress={() => toggleOption(option)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.optionButtonText,
                    isSelected && styles.optionButtonTextSelected,
                  ]}
                >
                  {option}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

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
          <Text style={styles.totalValue}>
            {selectedPrice > 0 ? `R$ ${priceFormatter.format(total)}` : "--"}
          </Text>
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
      </View>
    </View>
  );
}
