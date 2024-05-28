import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const screenWidth = width < height ? width : height;
const screenHeight = width < height ? height : width;

const guidelineBaseWidth = 414;
const guidelineBaseHeight = 736;

const CURRENT_RESOLUTION = Math.sqrt(
  screenHeight * screenHeight + screenWidth * screenWidth,
);

export const create = (
  designSize = { width: guidelineBaseWidth, height: guidelineBaseHeight },
) => {
  if (
    !designSize ||
    !designSize.width ||
    !designSize.height ||
    typeof designSize.width !== 'number' ||
    typeof designSize.height !== 'number'
  ) {
    throw new Error(
      'react-native-pixel-perfect | create function | Invalid design size object! must have width and height fields of type Number.',
    );
  }
  const DESIGN_RESOLUTION = Math.sqrt(
    designSize.height * designSize.height + designSize.width * designSize.width,
  );
  const RESOLUTIONS_PROPORTION = CURRENT_RESOLUTION / DESIGN_RESOLUTION;
  return (size: number) => RESOLUTIONS_PROPORTION * size;
};

const ratio = create();

const baseMargin = ratio(16);
const smallMargin = ratio(8);
const doubleBaseMargin = ratio(32);

export default {
  screenWidth,
  screenHeight,
  ratio,
  baseMargin,
  smallMargin,
  doubleBaseMargin,
};
