import {ImageSizeEnum} from './types';

class ImageHelperClass {
  url: string;
  constructor(url: string) {
    this.url = url;
  }

  getImageSize = (size: ImageSizeEnum) => {
    return this.url.replace(/\/([^/]+)$/g, `/${size}$1`);
  };
}

const ImageHelper = (url: string) => new ImageHelperClass(url);

export default ImageHelper;
