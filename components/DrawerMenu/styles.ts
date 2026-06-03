import { Colors, Font_Size } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: Colors.SHAPE,
  },
  greeting: {
    fontSize: Font_Size.SM,
    color: Colors.SECONDARY_500,
  },
  userName: {
    fontSize: Font_Size.LG,
    color: Colors.SECONDARY_900,
    fontWeight: "700",
    marginTop: 4,
  },
  footer: {
    marginTop: "auto",
    borderTopWidth: 1,
    borderTopColor: Colors.SHAPE,
    paddingTop: 8,
  },
});
