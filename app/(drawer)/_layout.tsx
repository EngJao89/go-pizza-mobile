import { Drawer } from "expo-router/drawer";
import DrawerMenu from "@/components/DrawerMenu";
import { Colors, Font_Size } from "@/constants/theme";

export default function DrawerLayout() {
  return (
    <Drawer
      drawerContent={(props) => <DrawerMenu {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.RED_2,
        drawerInactiveTintColor: Colors.SECONDARY_500,
        drawerLabelStyle: {
          fontSize: Font_Size.MD,
          fontWeight: "600",
        },
      }}
    >
      <Drawer.Screen
        name="dashboard/page"
        options={{ drawerLabel: "Cardápio", title: "Cardápio" }}
      />
      <Drawer.Screen
        name="orders/page"
        options={{ drawerLabel: "Pedidos", title: "Pedidos" }}
      />
      <Drawer.Screen
        name="pizza-register/page"
        options={{ drawerLabel: "Cadastrar pizza", title: "Cadastrar pizza" }}
      />
      <Drawer.Screen
        name="product-register/page"
        options={{ drawerLabel: "Cadastrar bebida", title: "Cadastrar bebida" }}
      />
      <Drawer.Screen
        name="details/[id]"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Detalhes",
        }}
      />
      <Drawer.Screen
        name="pizza-edit/[id]/page"
        options={{
          drawerItemStyle: { display: "none" },
          title: "Editar pizza",
        }}
      />
    </Drawer>
  );
}
