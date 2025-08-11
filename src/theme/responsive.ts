import { Dimensions } from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

// Guideline sizes are based on standard iPhone X/11 (375 x 812)
const guidelineBaseWidth = 375;
const guidelineBaseHeight = 812;

export function scale(size: number): number {
  return (screenWidth / guidelineBaseWidth) * size;
}

export function verticalScale(size: number): number {
  return (screenHeight / guidelineBaseHeight) * size;
}

export function moderateScale(size: number, factor = 0.5): number {
  return size + (scale(size) - size) * factor;
}

export function rem(size: number): number {
  return moderateScale(size, 0.5);
}

export const responsive = {
  scale,
  verticalScale,
  moderateScale,
  rem
};


