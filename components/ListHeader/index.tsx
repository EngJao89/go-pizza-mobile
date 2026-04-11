import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router, type Href } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useAuth } from "@/contexts/AuthContext";
import { styles } from "./styles";

type ListHeaderProps = Readonly<{
  search: string;
  onChangeSearch: (value: string) => void;
  userName?: string;
}>;

export default function ListHeader({
  search,
  onChangeSearch,
  userName = "Garçom",
}: ListHeaderProps) {
  const insets = useSafeAreaInsets();
  const { signOut } = useAuth();

  async function handleLogout() {
    await signOut();
    router.replace("/signin/page" as Href);
  }

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 16 },
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.greetingRow}>
          <Text style={styles.emoji}>😄</Text>
          <View>
            <Text style={styles.title}>Olá, {userName}</Text>
            <Text style={styles.subtitle}>Bem-vindo de volta</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.logoutButton}
          onPress={handleLogout}
          activeOpacity={0.8}
        >
          <Ionicons name="log-out-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar pizza"
          placeholderTextColor="#93797B"
          value={search}
          onChangeText={onChangeSearch}
        />
        <TouchableOpacity style={styles.searchButton} activeOpacity={0.8}>
          <Ionicons name="search" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
