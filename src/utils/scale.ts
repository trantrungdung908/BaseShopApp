import {Dimensions, PixelRatio} from 'react-native';
import {styled} from '@/global';
import DeviceInfo from 'react-native-device-info';

//Guideline sizes are based on iphone 6/7/8
export const guidelineBaseWidth = 375;
export const guidelineBaseHeight = 667;
export const isTablet = DeviceInfo.isTablet;

let dims = Dimensions.get('screen');

export const TabletLeftWidth = 375;

export const isLandscape = () => dims.width > dims.height;

let screenWidth = dims.width;
let screenHeight = dims.height;
const [shortDimension, longDimension] =
  screenWidth < screenHeight
    ? [screenWidth, screenHeight]
    : [screenHeight, screenWidth];

export const screenShortDimension = shortDimension;
export const screenLongDimension = longDimension;

export const scaleFactor = shortDimension / guidelineBaseWidth;
export const vScaleFactor = longDimension / guidelineBaseHeight;

export const scale = (size: number) =>
  PixelRatio.roundToNearestPixel(size * scaleFactor);

export const vScale = (size: number) =>
  PixelRatio.roundToNearestPixel(size * vScaleFactor);
export const fScale = (size: number, factor = 0.25) =>
  PixelRatio.roundToNearestPixel(size + (scale(size) - size) * factor);

export const fontScale = (size: number) => Math.round(fScale(size, 0.25));

export const scaled: typeof styled = component => {
  const c = styled(component);

  const output = (css: TemplateStringsArray, ...args: any) => {
    const cssParts = css.map(part => {
      return part.replace(/(\d+)s/gim, (numberWithPixel, number) => {
        return scale(Number(number)) + 'px';
      });
    });

    // @ts-ignore
    cssParts.raw = css.raw;

    return c(cssParts as unknown as TemplateStringsArray, ...args);
  };

  output.attrs = (p: any) => {
    const _c = c.attrs(p);
    _c.prototype.call = output;
    return _c;
  };

  return output;
};

export const fTabletScale = (size: number) => {
  if (isTablet()) {
    return fScale(size);
  }
  return size;
};
