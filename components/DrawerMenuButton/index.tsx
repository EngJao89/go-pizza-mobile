import { Ionicons } from "@expo/vector-icons";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "expo-router";
import { TouchableOpacity, type StyleProp, type ViewStyle } from "react-native";
import { styles } from "./styles";

type DrawerMenuButtonProps = Readonly<{
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}>;

export default function DrawerMenuButton({
  color = "#FFFFFF",
  size = 24,
  style,
}: DrawerMenuButtonProps) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel="Abrir menu"
    >
      <Ionicons name="menu" size={size} color={color} />
    </TouchableOpacity>
  );
}
