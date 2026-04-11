import type { Href } from "expo-router";
import { router, useSegments } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

type FooterTabsProps = Readonly<{
  ordersCount?: number;
  isAdmin?: boolean;
}>;

export default function FooterTabs({
  ordersCount = 0,
  isAdmin = false,
}: FooterTabsProps) {
  const segments = useSegments();
  const root = segments[0] ?? "";
  const isDashboard = root === "dashboard";
  const isOrders = root === "orders";
  const isRegister = root === "pizza-register";

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tabWrapper}
        onPress={() => {
          if (!isDashboard) router.replace("/dashboard/page" as Href);
        }}
        activeOpacity={0.8}
      >
        <View style={styles.tab}>
          <Text
            style={[
              styles.tabLabel,
              isDashboard && styles.tabLabelActive,
            ]}
            numberOfLines={1}
          >
            Cardápio
          </Text>
        </View>
        {isDashboard && <View style={styles.underline} />}
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.tabWrapper}
        onPress={() => {
          if (!isOrders) router.replace("/orders/page" as Href);
        }}
        activeOpacity={0.8}
      >
        <View style={styles.tab}>
          <Text
            style={[
              styles.tabLabel,
              isOrders && styles.tabLabelActive,
            ]}
            numberOfLines={1}
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

      {isAdmin ? (
        <TouchableOpacity
          style={styles.tabWrapper}
          onPress={() => {
            if (!isRegister) router.replace("/pizza-register/page" as Href);
          }}
          activeOpacity={0.8}
        >
          <View style={styles.tab}>
            <Text
              style={[
                styles.tabLabel,
                styles.tabLabelCompact,
                isRegister && styles.tabLabelActive,
              ]}
              numberOfLines={1}
            >
              Cadastrar
            </Text>
          </View>
          {isRegister && <View style={styles.underline} />}
        </TouchableOpacity>
      ) : null}
    </View>
  );
}
