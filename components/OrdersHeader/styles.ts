import { Colors, Font_Size, Fonts } from "@/constants/theme";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.RED_2,
    paddingBottom: 20,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: Font_Size.XL,
    color: Colors.WHITE,
    fontWeight: Platform.OS === "ios" ? "600" : "bold",
    textAlign: "center",
  },
});
