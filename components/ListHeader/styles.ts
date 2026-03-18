import { Colors, Font_Size } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.RED_2,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  greetingRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  emoji: {
    fontSize: 28,
  },
  title: {
    fontSize: Font_Size.LG,
    color: Colors.WHITE,
    fontWeight: "700",
  },
  subtitle: {
    fontSize: Font_Size.SM,
    color: Colors.WHITE,
    opacity: 0.9,
    marginTop: 2,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.7)",
    alignItems: "center",
    justifyContent: "center",
  },
  searchRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.WHITE,
    borderRadius: 999,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: Font_Size.MD,
    color: Colors.SECONDARY_900,
  },
  searchButton: {
    marginLeft: 12,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.GREEN_2,
    alignItems: "center",
    justifyContent: "center",
  },
  searchIcon: {
    color: Colors.WHITE,
  },
});
