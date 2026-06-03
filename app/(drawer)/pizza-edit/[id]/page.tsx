import { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams, type Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import api, { baseURL } from "@/lib/axios";
import {
  formToSizesAndPrices,
  pizzaFlavorFormSchema,
  pizzaToFlavorFormDefaults,
  type PizzaFlavorFormData,
} from "@/schemas/pizzaFlavorForm";
import type { Pizza } from "@/types/pizza";
import { useAuth } from "@/contexts/AuthContext";
import DrawerMenuButton from "@/components/DrawerMenuButton";
import { styles } from "@/app/(drawer)/pizza-register/_styles";

const PLACEHOLDER_COLOR = "#93797B";

function getImageUri(imageUrl: string): string {
  const path = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
  return `${baseURL}${path}`;
}

function leaveEditScreen() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/dashboard/page" as Href);
  }
}

function readApiMessage(e: unknown): string | null {
  if (e && typeof e === "object" && "response" in e) {
    return (e as { response?: { data?: { message?: string } } }).response?.data
      ?.message ?? null;
  }
  return null;
}

export default function PizzaEditPage() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const { isAdmin } = useAuth();

  const [loadError, setLoadError] = useState<string | null>(null);
  const [loadingPizza, setLoadingPizza] = useState(true);
  const [pizzaRecord, setPizzaRecord] = useState<Pizza | null>(null);
  const [existingImageUrl, setExistingImageUrl] = useState<string | null>(null);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<PizzaFlavorFormData>({
    resolver: zodResolver(pizzaFlavorFormSchema),
    defaultValues: {
      name: "",
      description: "",
      priceP: "",
      priceM: "",
      priceG: "",
    },
  });

  const descriptionLen = watch("description")?.length ?? 0;

  const fetchPizza = useCallback(async () => {
    if (!id || typeof id !== "string") {
      setLoadError("Pizza não encontrada.");
      setLoadingPizza(false);
      return;
    }
    setLoadError(null);
    setLoadingPizza(true);
    try {
      const { data } = await api.get<Pizza>(`api/pizza-flavors/${id}`);
      setPizzaRecord(data);
      reset(pizzaToFlavorFormDefaults(data));
      setExistingImageUrl(data.imageUrl ? getImageUri(data.imageUrl) : null);
      setImageUri(null);
      setImageMime(null);
    } catch {
      setLoadError("Não foi possível carregar esta pizza.");
    } finally {
      setLoadingPizza(false);
    }
  }, [id, reset]);

  useEffect(() => {
    void fetchPizza();
  }, [fetchPizza]);

  async function pickImage() {
    const perm = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!perm.granted) {
      Alert.alert(
        "Permissão",
        "É necessário permitir o acesso à galeria para escolher uma foto."
      );
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 0.85,
    });
    if (result.canceled || !result.assets[0]) return;
    const asset = result.assets[0];
    setImageUri(asset.uri);
    setImageMime(asset.mimeType ?? "image/jpeg");
  }

  async function onSubmit(data: PizzaFlavorFormData) {
    if (!id || typeof id !== "string") return;
    setApiError(null);
    const sizesAndPrices = formToSizesAndPrices(data);
    const payload = {
      name: data.name.trim(),
      description: data.description.trim(),
      sizesAndPrices,
      availableOptions: pizzaRecord?.availableOptions ?? [],
    };

    try {
      if (imageUri) {
        const form = new FormData();
        form.append("name", payload.name);
        form.append("description", payload.description);
        form.append("sizesAndPrices", JSON.stringify(sizesAndPrices));
        form.append("availableOptions", JSON.stringify(payload.availableOptions));
        form.append("image", {
          uri: imageUri,
          name: "pizza.jpg",
          type: imageMime ?? "image/jpeg",
        } as unknown as Blob);
        await api.put(`api/pizza-flavors/${id}`, form);
      } else {
        await api.put(`api/pizza-flavors/${id}`, payload);
      }
      Alert.alert("Sucesso", "Pizza atualizada.", [
        { text: "OK", onPress: () => router.replace("/dashboard/page" as Href) },
      ]);
    } catch (e: unknown) {
      setApiError(
        readApiMessage(e) ??
          "Não foi possível atualizar. Verifique os dados e tente de novo."
      );
    }
  }

  function confirmDelete() {
    if (!id || typeof id !== "string") return;
    Alert.alert(
      "Excluir sabor",
      "Tem certeza? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            try {
              await api.delete(`api/pizza-flavors/${id}`);
              router.replace("/dashboard/page" as Href);
            } catch (e: unknown) {
              Alert.alert(
                "Erro",
                readApiMessage(e) ?? "Não foi possível excluir este sabor."
              );
            }
          },
        },
      ]
    );
  }

  if (!isAdmin) {
    return (
      <View style={[styles.screen, { justifyContent: "center", padding: 24 }]}>
        <StatusBar style="dark" />
        <Text style={{ textAlign: "center", color: "#572D31" }}>
          Apenas administradores podem alterar sabores.
        </Text>
        <TouchableOpacity onPress={leaveEditScreen} style={{ marginTop: 16 }}>
          <Text style={{ color: "#B83341", fontWeight: "600", textAlign: "center" }}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (loadingPizza) {
    return (
      <View style={[styles.screen, { justifyContent: "center", alignItems: "center" }]}>
        <StatusBar style="light" />
        <ActivityIndicator size="large" color="#B83341" />
      </View>
    );
  }

  if (loadError || !id) {
    return (
      <View style={[styles.screen, { justifyContent: "center", padding: 24 }]}>
        <StatusBar style="dark" />
        <Text style={{ textAlign: "center", color: "#572D31" }}>
          {loadError ?? "Pizza não encontrada."}
        </Text>
        <TouchableOpacity onPress={leaveEditScreen} style={{ marginTop: 16 }}>
          <Text style={{ color: "#B83341", fontWeight: "600", textAlign: "center" }}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const displayPhotoUri = imageUri ?? existingImageUrl;

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={leaveEditScreen}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Alterar</Text>
        <View style={styles.headerActions}>
          <DrawerMenuButton />
          <Pressable onPress={confirmDelete}>
            <Text style={styles.deleteText}>Deletar</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.photoRow}>
          <View style={styles.photoCircle}>
            {displayPhotoUri ? (
              <Image
                source={{ uri: displayPhotoUri }}
                style={styles.photoPreview}
                contentFit="cover"
              />
            ) : (
              <Text style={styles.photoPlaceholder}>Nenhuma foto carregada</Text>
            )}
          </View>
          <TouchableOpacity style={styles.loadBtn} onPress={pickImage} activeOpacity={0.85}>
            <Text style={styles.loadBtnText}>Carregar</Text>
          </TouchableOpacity>
        </View>

        {apiError ? <Text style={styles.formError}>{apiError}</Text> : null}

        <Text style={styles.label}>Nome</Text>
        <Controller
          control={control}
          name="name"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nome da pizza"
              placeholderTextColor={PLACEHOLDER_COLOR}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.name?.message ? (
          <Text style={styles.errorText}>{errors.name.message}</Text>
        ) : null}

        <View style={styles.labelRow}>
          <Text style={[styles.label, { marginBottom: 0 }]}>Descrição</Text>
          <Text style={styles.hint}>Max 60 caracteres ({descriptionLen}/60)</Text>
        </View>
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Ingredientes e detalhes"
              placeholderTextColor={PLACEHOLDER_COLOR}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
              maxLength={60}
            />
          )}
        />
        {errors.description?.message ? (
          <Text style={styles.errorText}>{errors.description.message}</Text>
        ) : null}

        <Text style={styles.sectionTitle}>Tamanhos e preços</Text>

        {(["priceP", "priceM", "priceG"] as const).map((field, idx) => {
          const letter = ["P", "M", "G"][idx];
          return (
            <View key={field}>
              <View style={styles.sizeRow}>
                <View style={styles.sizeLetter}>
                  <Text style={styles.sizeLetterText}>{letter}</Text>
                </View>
                <Controller
                  control={control}
                  name={field}
                  render={({ field: f }) => (
                    <TextInput
                      style={styles.sizePriceInput}
                      placeholder="R$ 0,00"
                      placeholderTextColor={PLACEHOLDER_COLOR}
                      keyboardType="decimal-pad"
                      value={f.value}
                      onChangeText={f.onChange}
                      onBlur={f.onBlur}
                    />
                  )}
                />
              </View>
              {errors[field]?.message ? (
                <Text style={styles.errorText}>{errors[field]?.message}</Text>
              ) : null}
            </View>
          );
        })}

        <TouchableOpacity
          style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          activeOpacity={0.9}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitBtnText}>Atualizar pizza</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
