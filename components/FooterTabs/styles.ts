import { Colors, Font_Size } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 20,
    backgroundColor: Colors.WHITE,
    borderTopWidth: 1,
    borderTopColor: Colors.SHAPE,
  },
  tab: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  tabLabel: {
    fontSize: Font_Size.MD,
    color: Colors.SECONDARY_500,
    fontWeight: "500",
  },
  tabLabelActive: {
    color: Colors.SECONDARY_900,
    fontWeight: "700",
  },
  badge: {
    minWidth: 24,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 999,
    backgroundColor: Colors.GREEN_2,
    alignItems: "center",
    justifyContent: "center",
  },
  badgeText: {
    color: Colors.WHITE,
    fontSize: Font_Size.TAG,
    fontWeight: "700",
  },
  underline: {
    position: "absolute",
    bottom: 4,
    left: 0,
    right: 0,
    height: 3,
    borderRadius: 999,
    backgroundColor: Colors.SECONDARY_900,
  },
  tabWrapper: {
    alignItems: "center",
    flex: 1,
    minWidth: 0,
  },
  tabLabelCompact: {
    fontSize: Font_Size.SM,
  },
});
