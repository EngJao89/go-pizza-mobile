import { Colors, Font_Size, Fonts } from '@/constants/theme';
import { Dimensions, Platform, StyleSheet } from 'react-native';

const H_PADDING = 28;
const winH = Dimensions.get('window').height;
const inputBg = 'rgba(255, 255, 255, 0.16)';
const inputBorder = 'rgba(255, 255, 255, 0.28)';

export const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: Colors.SIGNIN_BG,
  },
  scroll: {
    flexGrow: 1,
  },
  container: {
    flexGrow: 1,
    backgroundColor: Colors.SIGNIN_BG,
    paddingBottom: 32,
    minHeight: winH,
  },
  hero: {
    width: '100%',
    height: Math.min(winH * 0.52, 420),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  form: {
    paddingHorizontal: H_PADDING,
    paddingTop: 8,
    gap: 16,
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: Font_Size.XXXL,
    color: Colors.WHITE,
    fontWeight: Platform.OS === 'ios' ? '700' : 'bold',
    marginBottom: 4,
    letterSpacing: -0.5,
  },
  input: {
    backgroundColor: inputBg,
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    fontSize: Font_Size.MD,
    color: Colors.WHITE,
    borderWidth: 1,
    borderColor: inputBorder,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: inputBg,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: inputBorder,
  },
  passwordInput: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: Platform.OS === 'ios' ? 16 : 14,
    fontSize: Font_Size.MD,
    color: Colors.WHITE,
  },
  eyeButton: {
    paddingHorizontal: 14,
    paddingVertical: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  forgotRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: -4,
    marginBottom: 4,
  },
  forgotText: {
    color: Colors.WHITE,
    fontSize: Font_Size.SM,
    fontWeight: '500',
  },
  submitButton: {
    backgroundColor: Colors.SIGNIN_BUTTON,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonDisabled: {
    opacity: 0.65,
  },
  submitButtonText: {
    color: Colors.WHITE,
    fontSize: Font_Size.MD,
    fontWeight: '700',
  },
  errorText: {
    color: 'rgba(255,255,255,0.95)',
    fontSize: Font_Size.SM,
    marginTop: 4,
    textShadowColor: 'rgba(0,0,0,0.25)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  formError: {
    color: Colors.WHITE,
    fontSize: Font_Size.SM,
    textAlign: 'center',
    marginBottom: 4,
    backgroundColor: 'rgba(0,0,0,0.12)',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  linkButton: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 8,
  },
  linkButtonText: {
    color: 'rgba(255,255,255,0.92)',
    fontSize: Font_Size.SM,
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
});
