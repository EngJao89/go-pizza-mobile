import { Colors } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.SHAPE,
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
    paddingBottom: 16,
  },
  list: {
    flex: 1,
  },
  emptyWrap: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyTitle: {
    color: Colors.SECONDARY_900,
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
  emptySubtitle: {
    color: Colors.SECONDARY_500,
    fontSize: 14,
    textAlign: "center",
    marginTop: 8,
  },
});
