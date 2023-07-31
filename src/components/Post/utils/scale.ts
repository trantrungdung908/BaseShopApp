import {Dimensions, PixelRatio, ScaledSize} from 'react-native';

//Guideline sizes are based on iphone 6/7/8 plus
export const guidelineBaseWidth = 414;
export const guidelineBaseHeight = 736;

let dims = Dimensions.get('screen');
const handler = (newDims: ScaledSize) => (dims = newDims);

// @ts-ignore
Dimensions.addEventListener('change', handler);
export const isLandscape = () => dims.width > dims.height;
let screenWidth = dims.width;
let screenHeight = dims.height;
const [shortDimension, longDimension] =
  screenWidth < screenHeight
    ? [screenWidth, screenHeight]
    : [screenHeight, screenWidth];

export const isSmallDevice = shortDimension <= 375;
