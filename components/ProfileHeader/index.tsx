import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import DrawerMenuButton from "@/components/DrawerMenuButton";
import { styles } from "./styles";

type ProfileHeaderProps = Readonly<{
  title?: string;
}>;

export default function ProfileHeader({ title = "Meu perfil" }: ProfileHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 16 }]}>
      <View style={styles.row}>
        <DrawerMenuButton />
        <Text style={styles.title}>{title}</Text>
        <View style={styles.sideSpacer} />
      </View>
    </View>
  );
}
