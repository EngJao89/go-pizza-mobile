import { Colors, Font_Size } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.RED_2,
    paddingVertical: 28,
    paddingHorizontal: 32,

    flexDirection: "column",
    alignItems: "center"
  },
  title: {
    fontSize: Font_Size.LG,
    color: Colors.WHITE,
    fontWeight: "bold",
    marginTop: 48,
  },
  subtitle: {
    fontSize: Font_Size.MD,
    color: Colors.WHITE,
    fontWeight: "bold",
    marginTop: 24,
  }
});
