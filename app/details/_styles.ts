import { Colors, Font_Size, Fonts } from '@/constants/theme';
import { StyleSheet } from 'react-native';

const H_PADDING = 24;
const V_SPACING = 16;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.SIGNIN_BG,
  },
  backContent: {
    paddingTop: 48,
    paddingHorizontal: H_PADDING,
    paddingBottom: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.6)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingHorizontal: H_PADDING,
    paddingBottom: 32,
  },
  pizzaWrapper: {
    alignSelf: 'center',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 8,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.WHITE,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    paddingHorizontal: H_PADDING,
    paddingTop: 32,
    paddingBottom: 32,
  },
  title: {
    fontFamily: Fonts.serif,
    fontSize: Font_Size.XXL,
    color: Colors.SECONDARY_900,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Font_Size.MD,
    color: Colors.SECONDARY_500,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  sectionTitle: {
    fontSize: Font_Size.MD,
    color: Colors.SECONDARY_900,
    fontWeight: '600',
    marginBottom: 12,
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginTop: V_SPACING,
    marginBottom: V_SPACING,
  },
  optionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.SHAPE,
    backgroundColor: Colors.GRAY_1,
  },
  optionButtonSelected: {
    borderColor: Colors.RED_2,
    backgroundColor: Colors.GREEN_1,
  },
  optionButtonText: {
    color: Colors.GRAY_2,
    fontSize: Font_Size.SM,
    fontWeight: '600',
  },
  optionButtonTextSelected: {
    color: Colors.RED_2,
  },
  selectContent: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginTop: 4,
  },
  sizeButton: {
    minWidth: 96,
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.SHAPE,
    backgroundColor: Colors.WHITE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButtonSelected: {
    borderColor: Colors.GREEN_2,
    backgroundColor: Colors.GREEN_1,
  },
  sizeLabel: {
    color: Colors.GRAY_2,
    fontSize: Font_Size.MD,
    fontWeight: 'bold',
  },
  sizeLabelSelected: {
    color: Colors.RED_2,
  },
  sizePrice: {
    color: Colors.GRAY_3,
    fontSize: Font_Size.SM,
    marginTop: 2,
  },
  sizePriceSelected: {
    color: Colors.SECONDARY_900,
    fontWeight: '600',
  },
  fieldsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
    marginTop: V_SPACING,
  },
  field: {
    flex: 1,
  },
  fieldLabel: {
    fontSize: Font_Size.SM,
    color: Colors.SECONDARY_500,
    marginBottom: 6,
  },
  fieldInput: {
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.SHAPE,
    paddingHorizontal: 14,
    fontSize: Font_Size.MD,
    color: Colors.SECONDARY_900,
    backgroundColor: Colors.WHITE,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: V_SPACING,
    marginBottom: 12,
  },
  totalLabel: {
    fontSize: Font_Size.MD,
    color: Colors.SECONDARY_500,
    marginRight: 4,
  },
  totalValue: {
    fontSize: Font_Size.MD,
    color: Colors.SECONDARY_900,
    fontWeight: '700',
  },
  confirmButton: {
    marginTop: 4,
    backgroundColor: Colors.GREEN_2,
    borderRadius: 999,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  confirmButtonText: {
    color: Colors.WHITE,
    fontSize: Font_Size.MD,
    fontWeight: '700',
  },
});
