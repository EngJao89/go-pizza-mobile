import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DrawerMenuButton from "@/components/DrawerMenuButton";
import { styles } from "./styles";

export default function OrdersHeader() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.row}>
        <DrawerMenuButton />
        <Text style={styles.title}>Pedidos feitos</Text>
        <View style={styles.sideSpacer} />
      </View>
    </View>
  );
}
