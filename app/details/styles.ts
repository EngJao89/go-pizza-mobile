import { Colors, Font_Size } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 0,
    margin: 0,
  },
  backContent: {
    marginTop: 48,
    marginBottom: 8,
    marginLeft: 24,
    marginRight: 24,
  },
  title: {
    fontSize: Font_Size.XXL,
    color: Colors.GRAY_2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginLeft: 24,
    marginRight: 16,
    marginTop: 8,
    marginBottom: 0,
  },
  subtitle: {
    flex: 1,
    fontSize: Font_Size.MD,
    color: Colors.GRAY_3,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 12,
    marginLeft: 24,
    marginRight: 36,
  },
});