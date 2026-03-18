import { Text, TouchableOpacity, View } from "react-native";
import { router, useSegments } from "expo-router";
import { styles } from "./styles";

type FooterTabsProps = Readonly<{
  ordersCount?: number;
}>;

export default function FooterTabs({ ordersCount = 0 }: FooterTabsProps) {
  const segments = useSegments();
  const isOrders = segments[0] === "orders";

  function goToDashboard() {
    if (!isOrders) return;
    router.replace("/dashboard/page");
  }

  function goToOrders() {
    if (isOrders) return;
    router.replace("/orders/page");
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tabWrapper}
        onPress={goToDashboard}
        activeOpacity={0.8}
      >
        <View style={styles.tab}>
          <Text
            style={[
              styles.tabLabel,
              !isOrders && styles.tabLabelActive,
            ]}
          >
            Cardápio
          </Text>
        </View>
        {!isOrders && <View style={styles.underline} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabWrapper}
        onPress={goToOrders}
        activeOpacity={0.8}
      >
        <View style={styles.tab}>
          <Text
            style={[
              styles.tabLabel,
              isOrders && styles.tabLabelActive,
            ]}
          >
            Pedidos
          </Text>
          {ordersCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{ordersCount}</Text>
            </View>
          )}
        </View>
        {isOrders && <View style={styles.underline} />}
      </TouchableOpacity>
    </View>
  );
}

