import { Text, View } from "react-native";
import FooterTabs from "@/components/FooterTabs";

export default function OrdersPage() {
  return (
    <View style={{ flex: 1, backgroundColor: "#F4F4F5" }}>
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          paddingTop: 32,
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
            marginBottom: 8,
            color: "#572D31",
          }}
        >
          Pedidos
        </Text>
        <Text
          style={{
            color: "#7A6769",
          }}
        >
          Você ainda não possui pedidos em aberto.
        </Text>
      </View>
      <FooterTabs ordersCount={0} />
    </View>
  );
}