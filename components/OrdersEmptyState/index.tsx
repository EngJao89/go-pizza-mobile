import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Colors, Font_Size } from "@/constants/theme";
import { styles } from "./styles";

export default function OrdersEmptyState() {
  return (
    <View style={styles.wrapper}>
      <View style={styles.iconCircle}>
        <Ionicons name="receipt-outline" size={48} color={Colors.RED_2} />
      </View>
      <Text style={styles.title}>Nenhum pedido ainda</Text>
      <Text style={styles.subtitle}>
        Quando houver pedidos feitos, eles aparecerão aqui em forma de grade,
        com o status de cada um.
      </Text>
    </View>
  );
}
