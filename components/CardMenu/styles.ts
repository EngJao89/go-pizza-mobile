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
    gap: 8,
  },
  info: {
    gap: 4,
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
  image: {
    marginRight: 4,
    height: 96,
    width: 96,
  }
});
