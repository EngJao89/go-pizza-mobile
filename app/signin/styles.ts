import { Colors, Font_Size } from '@/constants/theme';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.RED_2,
    paddingBottom: 0,
    gap: 8,
  },
  backgroundImage: {
    width: '100%',
    height: 200,
    marginTop: 0,
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
  form: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingTop: 32,
    paddingHorizontal: 32,
    gap: 24,
  },
  inputContainer: {
    gap: 8,
  },
  label: {
    fontSize: Font_Size.MD,
    color: Colors.SECONDARY_900,
    fontWeight: '600',
  },
  input: {
    backgroundColor: Colors.GRAY_1,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: Font_Size.MD,
    color: Colors.SECONDARY_900,
    borderWidth: 1,
    borderColor: Colors.SHAPE,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.GRAY_1,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.SHAPE,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: Font_Size.MD,
    color: Colors.SECONDARY_900,
  },
  eyeButton: {
    paddingHorizontal: 16,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});