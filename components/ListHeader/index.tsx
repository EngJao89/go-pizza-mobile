import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DrawerMenuButton from "@/components/DrawerMenuButton";
import { styles } from "./styles";

type ListHeaderProps = Readonly<{
  search: string;
  onChangeSearch: (value: string) => void;
  userName?: string;
  searchPlaceholder?: string;
}>;

export default function ListHeader({
  search,
  onChangeSearch,
  userName = "Garçom",
  searchPlaceholder = "Buscar pizza",
}: ListHeaderProps) {
  const insets = useSafeAreaInsets();

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

        <DrawerMenuButton style={styles.menuButton} />
      </View>

      <View style={styles.searchRow}>
        <TextInput
          style={styles.searchInput}
          placeholder={searchPlaceholder}
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
