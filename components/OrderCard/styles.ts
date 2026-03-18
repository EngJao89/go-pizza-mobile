import { Colors, Font_Size } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  cell: {
    width: "50%",
    paddingVertical: 20,
    paddingHorizontal: 12,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: Colors.SHAPE,
    backgroundColor: Colors.WHITE,
  },
  cellRightBorder: {
    borderRightWidth: 1,
    borderRightColor: Colors.SHAPE,
  },
  image: {
    width: 88,
    height: 88,
    borderRadius: 44,
    marginBottom: 10,
  },
  name: {
    fontSize: Font_Size.MD,
    fontWeight: "700",
    color: Colors.SECONDARY_900,
    textAlign: "center",
    marginBottom: 4,
  },
  meta: {
    fontSize: Font_Size.SM,
    color: Colors.SECONDARY_500,
    textAlign: "center",
    marginBottom: 10,
  },
  statusPill: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    minWidth: 110,
    alignItems: "center",
  },
  statusText: {
    fontSize: Font_Size.SM,
    fontWeight: "700",
  },
});

export const statusStyles = {
  ready: {
    container: { backgroundColor: Colors.GREEN_2 },
    text: { color: Colors.WHITE },
  },
  preparing: {
    container: { backgroundColor: "#F5E8C8" },
    text: { color: Colors.SECONDARY_900 },
  },
  delivered: {
    container: { backgroundColor: Colors.SECONDARY_900 },
    text: { color: Colors.WHITE },
  },
} as const;
