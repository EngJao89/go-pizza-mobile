import { Colors, Font_Size } from "@/constants/theme";
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
    padding: 24,
  },
  errorText: {
    color: Colors.RED_2,
    textAlign: "center",
    marginBottom: 16,
  },
  retryText: {
    color: Colors.RED_2,
    fontWeight: "600",
  },
  scrollContent: {
    padding: 24,
    paddingBottom: 32,
  },
  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: Colors.RED_2,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 24,
  },
  avatarText: {
    color: Colors.WHITE,
    fontSize: Font_Size.XXL,
    fontWeight: "700",
  },
  card: {
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
  },
  label: {
    fontSize: Font_Size.XS,
    color: Colors.SECONDARY_500,
    marginBottom: 4,
    fontWeight: "600",
  },
  value: {
    fontSize: Font_Size.MD,
    color: Colors.SECONDARY_900,
    fontWeight: "500",
  },
  rolePill: {
    alignSelf: "flex-start",
    marginTop: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 999,
    backgroundColor: Colors.GREEN_1,
    borderWidth: 1,
    borderColor: Colors.GREEN_2,
  },
  roleText: {
    color: Colors.GREEN_2,
    fontSize: Font_Size.SM,
    fontWeight: "700",
  },
});
