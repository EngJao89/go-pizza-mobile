import { Image } from "expo-image";
import { Text, TouchableOpacity, View } from "react-native";
import type { Pizza } from "@/types/pizza";
import { baseURL } from "@/lib/axios";
import { styles } from "./styles";

type CardMenuProps = Readonly<{
  pizza: Pizza;
  onPress?: () => void;
}>;

function getImageUri(imageUrl: string): string {
  const path = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
  return `${baseURL}${path}`;
}

export default function CardMenu({ pizza, onPress }: CardMenuProps) {
  const imageUri = getImageUri(pizza.imageUrl);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Image source={{ uri: imageUri }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name}>{pizza.name}</Text>
        <Text style={styles.description}>{pizza.description}</Text>
      </View>
    </TouchableOpacity>
  );
}
