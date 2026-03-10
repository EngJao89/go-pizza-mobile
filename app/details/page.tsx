import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function DetailsPage() {
  return (
    <View style={styles.container}>
      <View style={styles.backContent}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.GRAY_2} />
        </TouchableOpacity>
      </View>
    </View>
  );
}