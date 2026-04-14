import type { Href } from "expo-router";
import { router, useSegments } from "expo-router";
import { useEffect, type ReactNode } from "react";
import { Pressable, Text, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { styles } from "./styles";

type FooterTabsProps = Readonly<{
  ordersCount?: number;
  isAdmin?: boolean;
}>;

const springActive = { damping: 18, stiffness: 280 };
const springPress = { damping: 16, stiffness: 420 };

function TabSlot({
  active,
  onPress,
  children,
}: Readonly<{
  active: boolean;
  onPress: () => void;
  children: ReactNode;
}>) {
  const activeProgress = useSharedValue(active ? 1 : 0);
  const pressed = useSharedValue(0);

  useEffect(() => {
    activeProgress.value = withSpring(active ? 1 : 0, springActive);
  }, [active, activeProgress]);

  const pressScale = useAnimatedStyle(() => ({
    transform: [{ scale: 1 - 0.04 * pressed.value }],
  }));

  const underlineStyle = useAnimatedStyle(() => ({
    opacity: activeProgress.value,
    transform: [
      { translateY: (1 - activeProgress.value) * 6 },
      { scaleX: 0.35 + 0.65 * activeProgress.value },
    ],
  }));

  return (
    <Pressable
      style={styles.tabWrapper}
      onPress={onPress}
      onPressIn={() => {
        pressed.value = withSpring(1, springPress);
      }}
      onPressOut={() => {
        pressed.value = withSpring(0, springPress);
      }}
    >
      <Animated.View style={[styles.tabColumn, pressScale]}>
        {children}
        <View style={styles.underlineSlot}>
          <Animated.View style={[styles.underlineBar, underlineStyle]} />
        </View>
      </Animated.View>
    </Pressable>
  );
}

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
      <TabSlot
        active={isDashboard}
        onPress={() => {
          if (!isDashboard) router.replace("/dashboard/page" as Href);
        }}
      >
        <View style={styles.tab}>
          <Text
            style={[styles.tabLabel, isDashboard && styles.tabLabelActive]}
            numberOfLines={1}
          >
            Cardápio
          </Text>
        </View>
      </TabSlot>

      <TabSlot
        active={isOrders}
        onPress={() => {
          if (!isOrders) router.replace("/orders/page" as Href);
        }}
      >
        <View style={styles.tab}>
          <Text
            style={[styles.tabLabel, isOrders && styles.tabLabelActive]}
            numberOfLines={1}
          >
            Pedidos
          </Text>
          {ordersCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{ordersCount}</Text>
            </View>
          ) : null}
        </View>
      </TabSlot>

      {isAdmin ? (
        <TabSlot
          active={isRegister}
          onPress={() => {
            if (!isRegister) router.replace("/pizza-register/page" as Href);
          }}
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
        </TabSlot>
      ) : null}
    </View>
  );
}
