import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export const horizontalscale = (size: number) => (width / guidelineBaseWidth) * size;

export const verticalScale = (size: number) =>
  (height / guidelineBaseHeight) * size;

export const moderateScale = (size: number, factor = 0.5) =>
  size + (horizontalscale(size) - size) * factor;

export const fontScale = (size: number) => {
  const newSize = moderateScale(size);
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
};
