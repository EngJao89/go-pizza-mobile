import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router, Link, type Href } from "expo-router";
import api from "@/lib/axios";
import { loginSchema, type LoginFormData } from "@/schemas/login";
import { styles } from "./styles";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormData) {
    setApiError(null);
    try {
      await api.post("api/auth/login", {
        email: data.email,
        password: data.password,
      });
      router.replace("/dashboard/page" as Href);
    } catch (error: unknown) {
      const message =
        error && typeof error === "object" && "response" in error
          ? (error as { response?: { data?: { message?: string } } }).response
              ?.data?.message
          : null;
      setApiError(message ?? "Falha ao entrar. Tente novamente.");
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/bg-preview .png")}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      <Text style={styles.title}>Login</Text>

      <View style={styles.form}>
        {apiError ? (
          <Text style={styles.formError}>{apiError}</Text>
        ) : null}

        <View style={styles.inputContainer}>
          <Text style={styles.label}>E-mail</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                placeholder="Digite seu e-mail"
                placeholderTextColor="#93797B"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
              />
            )}
          />
          {errors.email?.message ? (
            <Text style={styles.errorText}>{errors.email.message}</Text>
          ) : null}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Senha</Text>
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, value } }) => (
              <View style={styles.passwordContainer}>
                <TextInput
                  style={styles.passwordInput}
                  placeholder="Digite sua senha"
                  placeholderTextColor="#93797B"
                  value={value}
                  onChangeText={onChange}
                  onBlur={onBlur}
                  secureTextEntry={!showPassword}
                  autoCapitalize="none"
                  autoCorrect={false}
                />
                <TouchableOpacity
                  style={styles.eyeButton}
                  onPress={() => setShowPassword((prev) => !prev)}
                >
                  <Ionicons
                    name={showPassword ? "eye-off" : "eye"}
                    size={20}
                    color="#7A6769"
                  />
                </TouchableOpacity>
              </View>
            )}
          />
          {errors.password?.message ? (
            <Text style={styles.errorText}>{errors.password.message}</Text>
          ) : null}
        </View>

        <TouchableOpacity
          style={[
            styles.submitButton,
            isSubmitting && styles.submitButtonDisabled,
          ]}
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.submitButtonText}>Entrar</Text>
          )}
        </TouchableOpacity>

        <Link href="/signup/page" asChild>
          <TouchableOpacity style={styles.linkButton}>
            <Text style={styles.linkButtonText}>Criar conta</Text>
          </TouchableOpacity>
        </Link>
      </View>
    </View>
  );
}
