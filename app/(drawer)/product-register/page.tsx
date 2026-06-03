import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
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
import DrawerMenuButton from "@/components/DrawerMenuButton";
import { createProductWithImage } from "@/lib/createProductWithImage";
import {
  formToProductValor,
  productFormSchema,
  type ProductFormData,
} from "@/schemas/productForm";
import { useAuth } from "@/contexts/AuthContext";
import { styles } from "@/app/(drawer)/pizza-register/_styles";

function leaveRegisterScreen() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/dashboard/page" as Href);
  }
}

const PLACEHOLDER_COLOR = "#93797B";

export default function ProductRegisterPage() {
  const insets = useSafeAreaInsets();
  const { isAdmin } = useAuth();
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageMime, setImageMime] = useState<string | null>(null);
  const [imageError, setImageError] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      marca: "",
      titulo: "",
      descricao: "",
      conteudo: "",
      valor: "",
    },
  });

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
    setImageError(null);
  }

  async function onSubmit(data: ProductFormData) {
    setApiError(null);
    if (!imageUri) {
      setImageError("Selecione uma imagem da bebida.");
      return;
    }

    try {
      await createProductWithImage(
        {
          marca: data.marca.trim(),
          titulo: data.titulo.trim(),
          descricao: data.descricao.trim(),
          conteudo: data.conteudo.trim(),
          valor: formToProductValor(data),
        },
        imageUri,
        imageMime ?? "image/jpeg"
      );
      Alert.alert("Sucesso", "Bebida cadastrada.", [
        { text: "OK", onPress: () => router.replace("/dashboard/page" as Href) },
      ]);
    } catch (e: unknown) {
      const msg =
        e && typeof e === "object" && "response" in e
          ? (e as { response?: { data?: { message?: string } } }).response?.data
              ?.message
          : null;
      setApiError(
        msg ?? "Não foi possível cadastrar. Verifique os dados e tente de novo."
      );
    }
  }

  if (!isAdmin) {
    return (
      <View style={[styles.screen, { justifyContent: "center", padding: 24 }]}>
        <StatusBar style="dark" />
        <Text style={{ textAlign: "center", color: "#572D31" }}>
          Apenas administradores podem cadastrar bebidas.
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
        <Text style={styles.headerTitle}>Cadastrar bebida</Text>
        <View style={styles.headerActions}>
          <DrawerMenuButton />
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
        {imageError ? <Text style={styles.errorText}>{imageError}</Text> : null}

        {apiError ? <Text style={styles.formError}>{apiError}</Text> : null}

        <Text style={styles.label}>Marca</Text>
        <Controller
          control={control}
          name="marca"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Ex.: Coca Cola"
              placeholderTextColor={PLACEHOLDER_COLOR}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              autoCapitalize="words"
            />
          )}
        />
        {errors.marca?.message ? (
          <Text style={styles.errorText}>{errors.marca.message}</Text>
        ) : null}

        <Text style={styles.label}>Título</Text>
        <Controller
          control={control}
          name="titulo"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Ex.: Refrigerante Coca Cola 2L"
              placeholderTextColor={PLACEHOLDER_COLOR}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.titulo?.message ? (
          <Text style={styles.errorText}>{errors.titulo.message}</Text>
        ) : null}

        <Text style={styles.label}>Conteúdo</Text>
        <Controller
          control={control}
          name="conteudo"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Ex.: Refrigerante sabor cola"
              placeholderTextColor={PLACEHOLDER_COLOR}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.conteudo?.message ? (
          <Text style={styles.errorText}>{errors.conteudo.message}</Text>
        ) : null}

        <Text style={styles.label}>Descrição</Text>
        <Controller
          control={control}
          name="descricao"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Detalhes sobre a bebida"
              placeholderTextColor={PLACEHOLDER_COLOR}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              multiline
            />
          )}
        />
        {errors.descricao?.message ? (
          <Text style={styles.errorText}>{errors.descricao.message}</Text>
        ) : null}

        <Text style={styles.label}>Valor (R$)</Text>
        <Controller
          control={control}
          name="valor"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Ex.: 11,90"
              placeholderTextColor={PLACEHOLDER_COLOR}
              keyboardType="decimal-pad"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.valor?.message ? (
          <Text style={styles.errorText}>{errors.valor.message}</Text>
        ) : null}

        <TouchableOpacity
          style={[styles.submitBtn, isSubmitting && styles.submitBtnDisabled]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
          activeOpacity={0.9}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitBtnText}>Cadastrar bebida</Text>
          )}
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
