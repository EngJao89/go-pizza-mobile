import { Ionicons } from "@expo/vector-icons";
import {
  DrawerContentScrollView,
  DrawerItem,
  type DrawerContentComponentProps,
} from "@react-navigation/drawer";
import { router, usePathname, type Href } from "expo-router";
import { useEffect, useState } from "react";
import { Pressable, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Colors } from "@/constants/theme";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/lib/axios";
import { mapOrdersResponseToItems } from "@/lib/map-orders-response";
import { styles } from "./styles";

type MenuItem = Readonly<{
  label: string;
  href: Href;
  icon: keyof typeof Ionicons.glyphMap;
  adminOnly?: boolean;
  badge?: number;
}>;

export default function DrawerMenu(props: DrawerContentComponentProps) {
  const insets = useSafeAreaInsets();
  const pathname = usePathname();
  const { userName, isAdmin, signOut } = useAuth();
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    let cancelled = false;
    async function fetchOrdersCount() {
      try {
        const { data } = await api.get("api/orders");
        if (!cancelled) {
          setOrdersCount(mapOrdersResponseToItems(data).length);
        }
      } catch {
        if (!cancelled) setOrdersCount(0);
      }
    }
    fetchOrdersCount();
    return () => {
      cancelled = true;
    };
  }, [pathname]);

  const menuItems: MenuItem[] = [
    {
      label: "Cardápio",
      href: "/dashboard/page" as Href,
      icon: "restaurant-outline",
    },
    {
      label: "Bebidas",
      href: "/products/page" as Href,
      icon: "water-outline",
    },
    {
      label: "Pedidos",
      href: "/orders/page" as Href,
      icon: "receipt-outline",
      badge: ordersCount,
    },
    {
      label: "Meu perfil",
      href: "/profile/page" as Href,
      icon: "person-outline",
    },
    {
      label: "Cadastrar pizza",
      href: "/pizza-register/page" as Href,
      icon: "add-circle-outline",
      adminOnly: true,
    },
    {
      label: "Cadastrar bebida",
      href: "/product-register/page" as Href,
      icon: "beer-outline",
      adminOnly: true,
    },
  ];

  function navigateTo(href: Href) {
    props.navigation.closeDrawer();
    if (pathname === href) return;
    router.replace(href);
  }

  async function handleSignOut() {
    props.navigation.closeDrawer();
    await signOut();
    router.replace("/signin/page" as Href);
  }

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={[
        styles.content,
        { paddingTop: insets.top + 16, paddingBottom: insets.bottom + 16 },
      ]}
    >
      <Pressable
        style={styles.header}
        onPress={() => navigateTo("/profile/page" as Href)}
      >
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName} numberOfLines={2}>
          {userName || "Visitante"}
        </Text>
      </Pressable>

      {menuItems
        .filter((item) => !item.adminOnly || isAdmin)
        .map((item) => {
          const active = pathname === item.href;
          return (
            <DrawerItem
              key={item.href as string}
              label={
                item.badge && item.badge > 0
                  ? `${item.label} (${item.badge})`
                  : item.label
              }
              focused={active}
              activeTintColor={Colors.RED_2}
              inactiveTintColor={Colors.SECONDARY_500}
              icon={({ color, size }) => (
                <Ionicons name={item.icon} size={size} color={color} />
              )}
              onPress={() => navigateTo(item.href)}
            />
          );
        })}

      <View style={styles.footer}>
        <DrawerItem
          label="Sair"
          inactiveTintColor={Colors.RED_2}
          icon={({ color, size }) => (
            <Ionicons name="log-out-outline" size={size} color={color} />
          )}
          onPress={handleSignOut}
        />
      </View>
    </DrawerContentScrollView>
  );
}
