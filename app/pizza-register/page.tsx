import { useState } from "react";
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
import { router, type Href } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import api from "@/lib/axios";
import { slugifyImageName, uploadImageFile } from "@/lib/imageUpload";
import {
  formToSizesAndPrices,
  pizzaFlavorFormSchema,
  type PizzaFlavorFormData,
} from "@/schemas/pizzaFlavorForm";
import { useAuth } from "@/contexts/AuthContext";
import FooterTabs from "@/components/FooterTabs";
import { styles } from "./_styles";

function leaveRegisterScreen() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/dashboard/page" as Href);
  }
}

const PLACEHOLDER_COLOR = "#93797B";

export default function PizzaRegisterPage() {
  const insets = useSafeAreaInsets();
  const { isAdmin } = useAuth();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
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
    setApiError(null);
    const sizesAndPrices = formToSizesAndPrices(data);
    const payload: {
      name: string;
      description: string;
      sizesAndPrices: ReturnType<typeof formToSizesAndPrices>;
      availableOptions: string[];
      imageUrl?: string;
    } = {
      name: data.name.trim(),
      description: data.description.trim(),
      sizesAndPrices,
      availableOptions: [] as string[],
    };

    try {
      if (imageUri) {
        const imageKey = slugifyImageName(payload.name);
        const upload = await uploadImageFile(
          imageUri,
          imageMime ?? "image/jpeg",
          imageKey
        );
        payload.imageUrl = upload.fileDownloadUri;
      }
      await api.post("api/pizza-flavors", payload);
      Alert.alert("Sucesso", "Pizza cadastrada.", [
        { text: "OK", onPress: () => router.replace("/dashboard/page" as Href) },
      ]);
    } catch (e: unknown) {
      const msg =
        e && typeof e === "object" && "response" in e
          ? (e as { response?: { data?: { message?: string } } }).response?.data
              ?.message
          : null;
      setApiError(msg ?? "Não foi possível cadastrar. Verifique os dados e tente de novo.");
    }
  }

  if (!isAdmin) {
    return (
      <View style={[styles.screen, { justifyContent: "center", padding: 24 }]}>
        <StatusBar style="dark" />
        <Text style={{ textAlign: "center", color: "#572D31" }}>
          Apenas administradores podem cadastrar sabores.
        </Text>
        <TouchableOpacity onPress={leaveRegisterScreen} style={{ marginTop: 16 }}>
          <Text style={{ color: "#B83341", fontWeight: "600", textAlign: "center" }}>
            Voltar
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="light" />
      <View style={[styles.header, { paddingTop: insets.top + 12 }]}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={leaveRegisterScreen}
          activeOpacity={0.8}
        >
          <Ionicons name="chevron-back" size={22} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cadastrar</Text>
        <Pressable
          onPress={() =>
            Alert.alert(
              "Deletar",
              "A exclusão de sabores fica disponível ao editar um item existente."
            )
          }
        >
          <Text style={styles.deleteText}>Deletar</Text>
        </Pressable>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.photoRow}>
          <View style={styles.photoCircle}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.photoPreview} contentFit="cover" />
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
            <Text style={styles.submitBtnText}>Cadastrar pizza</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
      <FooterTabs isAdmin ordersCount={0} />
    </View>
  );
}
