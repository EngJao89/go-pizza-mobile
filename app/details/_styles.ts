import { Colors, Font_Size } from '@/constants/theme';
import { StyleSheet } from 'react-native';

const PADDING_H = 24;
const SPACING = 16;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.WHITE,
  },
  backContent: {
    paddingTop: 48,
    paddingBottom: SPACING,
    paddingHorizontal: PADDING_H,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: PADDING_H,
    paddingBottom: PADDING_H,
  },
  image: {
    width: '100%',
    height: 260,
    borderRadius: 12,
    marginBottom: SPACING,
  },
  title: {
    fontSize: Font_Size.XXL,
    color: Colors.GRAY_2,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: Font_Size.MD,
    color: Colors.GRAY_3,
    fontWeight: '400',
    textAlign: 'center',
    marginBottom: SPACING,
    lineHeight: 22,
  },
  info: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: SPACING,
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
  },
  sizeButton: {
    minWidth: 88,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.SHAPE,
    backgroundColor: Colors.GRAY_1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sizeButtonSelected: {
    borderColor: Colors.RED_2,
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
    marginTop: 4,
  },
  sizePriceSelected: {
    color: Colors.SECONDARY_900,
    fontWeight: '600',
  },
});
