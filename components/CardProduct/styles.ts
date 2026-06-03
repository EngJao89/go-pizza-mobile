import { Colors, Font_Size } from "@/constants/theme";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginHorizontal: 8,
    marginVertical: 8,
    padding: 24,
    backgroundColor: Colors.WHITE,
    borderRadius: 16,
  },
  content: {
    flex: 1,
    gap: 6,
  },
  name: {
    color: Colors.GRAY_2,
    fontSize: Font_Size.MD,
    fontWeight: "bold",
  },
  description: {
    color: Colors.GRAY_3,
    fontSize: Font_Size.SM,
    fontWeight: "400",
  },
  price: {
    color: Colors.GREEN_2,
    fontSize: Font_Size.MD,
    fontWeight: "700",
    marginTop: 4,
  },
  image: {
    marginRight: 12,
    height: 96,
    width: 96,
    borderRadius: 12,
  },
});
