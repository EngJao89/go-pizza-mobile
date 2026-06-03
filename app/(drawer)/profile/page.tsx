import { useCallback, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { router, type Href } from "expo-router";
import ProfileHeader from "@/components/ProfileHeader";
import api from "@/lib/axios";
import { getAuthToken } from "@/lib/auth-token";
import {
  formatBirthday,
  formatCpf,
  formatPhone,
  profileInitials,
} from "@/lib/format-profile";
import { mapAuthMeResponse } from "@/lib/map-user-response";
import type { UserProfile } from "@/types/user";
import { styles } from "./styles";

function ProfileField({
  label,
  value,
}: Readonly<{ label: string; value: string }>) {
  if (!value) return null;
  return (
    <View style={styles.card}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
}

export default function ProfilePage() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async () => {
    const token = getAuthToken();
    if (!token) {
      setProfile(null);
      setError("Faça login para ver seu perfil.");
      setLoading(false);
      return;
    }

    try {
      setError(null);
      const { data } = await api.get("api/auth/me");
      const mapped = mapAuthMeResponse(data);
      if (!mapped) {
        setProfile(null);
        setError("Não foi possível ler os dados do perfil.");
        return;
      }
      setProfile(mapped);
    } catch (e: unknown) {
      setProfile(null);
      const status =
        e && typeof e === "object" && "response" in e
          ? (e as { response?: { status?: number } }).response?.status
          : undefined;
      if (status === 401) {
        setError("Sessão expirada. Entre novamente.");
      } else {
        setError("Não foi possível carregar o perfil.");
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadProfile();
    }, [loadProfile])
  );

  if (loading) {
    return (
      <View style={styles.screen}>
        <ProfileHeader />
        <View style={styles.centered}>
          <ActivityIndicator size="large" />
        </View>
      </View>
    );
  }

  if (error || !profile) {
    return (
      <View style={styles.screen}>
        <ProfileHeader />
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error ?? "Perfil indisponível."}</Text>
          {error?.includes("login") || error?.includes("Sessão") ? (
            <TouchableOpacity
              onPress={() => router.replace("/signin/page" as Href)}
            >
              <Text style={styles.retryText}>Ir para login</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => {
              setLoading(true);
              loadProfile();
            }}>
              <Text style={styles.retryText}>Tentar novamente</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }

  const roleLabel = profile.isAdmin ? "Administrador" : "Garçom";

  return (
    <View style={styles.screen}>
      <ProfileHeader />
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{profileInitials(profile.name)}</Text>
        </View>

        <ProfileField label="Nome" value={profile.name} />
        <ProfileField label="E-mail" value={profile.email} />
        <ProfileField
          label="Telefone"
          value={profile.phone ? formatPhone(profile.phone) : ""}
        />
        <ProfileField
          label="CPF"
          value={profile.cpf ? formatCpf(profile.cpf) : ""}
        />
        <ProfileField
          label="Data de nascimento"
          value={profile.birthday ? formatBirthday(profile.birthday) : ""}
        />

        <View style={styles.card}>
          <Text style={styles.label}>Perfil de acesso</Text>
          <View style={styles.rolePill}>
            <Text style={styles.roleText}>{roleLabel}</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
