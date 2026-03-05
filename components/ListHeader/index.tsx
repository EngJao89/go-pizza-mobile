import { Text, View } from "react-native";
import { styles } from "./styles";

export default function ListHeader() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        😄 Bem Vindo(a)
      </Text>

      <Text style={styles.subtitle}>
        Escolha seu pedido e bom apetite! 🍕
      </Text>
    </View>
  );
}
