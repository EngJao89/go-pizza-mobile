import { Colors, Font_Size } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: 32,
    paddingVertical: 48,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.WHITE,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.GREEN_1,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
    borderWidth: 2,
    borderColor: Colors.SHAPE,
  },
  title: {
    fontSize: Font_Size.LG,
    fontWeight: "700",
    color: Colors.SECONDARY_900,
    textAlign: "center",
    marginBottom: 12,
  },
  subtitle: {
    fontSize: Font_Size.MD,
    color: Colors.SECONDARY_500,
    textAlign: "center",
    lineHeight: 22,
  },
});
