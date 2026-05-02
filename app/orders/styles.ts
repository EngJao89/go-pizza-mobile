import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorPad: {
    padding: 24,
  },
  errorText: {
    color: Colors.RED_2,
    textAlign: "center",
  },
  listContent: {
    paddingBottom: 8,
    flexGrow: 1,
  },
});
