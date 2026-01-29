import { Colors, Font_Size } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.RED_2,
    paddingBottom: 0,
    gap: 8,
  },
  title: {
    fontSize: Font_Size.XXL,
    color: Colors.WHITE,
    fontWeight: 'bold',
    marginLeft: 32,
    marginRight: 16,
    marginTop: 12,
    marginBottom: 12,
  },
});