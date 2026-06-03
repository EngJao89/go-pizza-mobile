import { Image } from "expo-image";
import { Text, View } from "react-native";
import { baseURL } from "@/lib/axios";
import { productDescription } from "@/lib/map-products-response";
import type { Product } from "@/types/product";
import { priceFormatter } from "@/utils/currencyFormater";
import { styles } from "./styles";

type CardProductProps = Readonly<{
  product: Product;
}>;

function getImageUri(imageUrl: string): string {
  if (imageUrl.startsWith("http")) return imageUrl;
  const path = imageUrl.startsWith("/") ? imageUrl.slice(1) : imageUrl;
  return `${baseURL}${path}`;
}

export default function CardProduct({ product }: CardProductProps) {
  const imageUri = getImageUri(product.imageUrl);
  const subtitle = `${product.marca} · ${productDescription(product)}`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: imageUri }} style={styles.image} contentFit="cover" />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {product.titulo}
        </Text>
        <Text style={styles.description} numberOfLines={2}>
          {subtitle}
        </Text>
        <Text style={styles.price}>R$ {priceFormatter.format(product.valor)}</Text>
      </View>
    </View>
  );
}
