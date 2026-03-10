import { Colors } from "@/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

export default function DetailsPage() {
  return (
    <View style={styles.container}>
      <View style={styles.backContent}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color={Colors.GRAY_2} />
        </TouchableOpacity>
      </View>

      <Image source={require('@/assets/images/pizza-details.png')} style={styles.image} />

        <Text style={styles.title}>Pizza de Calabresa</Text>
        <Text style={styles.subtitle}>Pizza de calabresa com borda recheada com catupiry e molho de tomate.</Text>
    </View>
  );
}