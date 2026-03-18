import { Platform } from 'react-native';

export const Colors = {
  GREEN_2: '#528F33',
  GREEN_1: '#F7FFF9',

  GRAY_3: '#7A6769',
  GRAY_2: '#572D31',
  GRAY_1: '#E1E1E6',

  SECONDARY_900: '#572D31',
  SECONDARY_500: '#7A6769',
  SECONDARY_400: '#93797B',

  RED_2: '#B83341',
  RED_1: '#E03F50',

  SIGNIN_BG: '#E03D4C',
  SIGNIN_BUTTON: '#FF415B',

  SHAPE: '#DCDCDC',
  WHITE: '#FFFFFF',
};

export const Font_Size = {
  XS: 12,
  SM: 14,
  MD: 16,
  LG: 20,
  XL: 36,
  XXL: 40,
  XXXL: 48,

  TAG: 10,
  BUTTON: 14,
}

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
