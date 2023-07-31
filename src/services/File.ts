import DocumentPicker, {
  DocumentPickerResponse,
} from 'react-native-document-picker';
import {Linking, PermissionsAndroid, Platform} from 'react-native';
import Share, {ShareSingleOptions} from 'react-native-share';
import {Buffer} from 'buffer';
import mime from 'mime';
import axios from 'axios';
import ImagePicker, {
  Image as ImagePickerImage,
  Options as ImagePickerOptions,
} from 'react-native-image-crop-picker';
import {CameraRoll} from '@react-native-camera-roll/camera-roll';
import {PERMISSIONS, request} from 'react-native-permissions';
import RNFetchBlob from 'rn-fetch-blob';

import {Camera} from 'react-native-vision-camera';

export type FileType = Partial<Omit<ImagePickerImage, 'size'>> &
  DocumentPickerResponse;

export type ShareOption = ShareSingleOptions & {isBase64?: boolean};

type DownloadOptions = {
  url: string;
  filename?: string;
  openFile?: boolean;
  isImage?: boolean;
};

export type TakeCameraOptions = ImagePickerOptions;
export type PickImageOptions = ImagePickerOptions;
export type PickFileOptions = {
  multiple?: boolean;
};
export type ProgressCallback = (progress: number, total: number) => any;

class File {
  pick = async (options: PickFileOptions) => {
    await this.askReadPermission();

    if (options.multiple) {
      // @ts-ignore
      return await DocumentPicker.pickMultiple({
        type: [DocumentPicker.types.allFiles],
      });
    }

    // @ts-ignore
    return [
      await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      }),
    ];
  };

  askWritePermission = async () => {
    if (Platform.OS !== 'android') {
      return;
    }
    const response = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    );

    if (response !== 'granted') {
      throw new Error('PERMISSION_REQUEST_FAILED');
    }

    return response;
  };

  askReadPermission = async () => {
    if (Platform.OS !== 'android') {
      return;
    }
    const response = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    );

    if (response !== 'granted') {
      throw new Error('PERMISSION_REQUEST_FAILED');
    }

    return response;
  };

  askCameraPermission = async () => {
    return await Camera.requestCameraPermission();
  };

  private _extractFileNameFromPath = (path: string) => {
    const splitFromPath = /\w+.\w+$/.exec(path);
    return splitFromPath && splitFromPath[0]
      ? splitFromPath[0]
      : Math.random().toString(36) + '.png';
  };

  takeCamera = async (options: TakeCameraOptions): Promise<FileType[]> => {
    if (Platform.OS === 'android') {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      if (status !== 'granted') {
        throw new Error('PERMISSION_REQUEST_FAILED');
      }
    }

    const result = await ImagePicker.openCamera(options);

    const output: FileType[] = [];

    if (Array.isArray(result)) {
      result.forEach(image => {
        const i: FileType = {
          ...image,
          name: image.filename || this._extractFileNameFromPath(image.path),
          // @ts-ignore
          size: image.size + '',
          type: image.mime || '*/*',
          uri: image.path,
        };

        output.push(i);
      });
    } else {
      const i: FileType = {
        ...result,
        name: result.filename || this._extractFileNameFromPath(result.path),
        // @ts-ignore
        size: result.size + '',
        type: result.mime || '*/*',
        uri: result.path,
      };

      output.push(i);
    }

    return output;
  };

  pickImage = async (
    options: PickImageOptions & {
      changeFileNameExtensionFromHEICToJpg?: boolean;
      onPermissionLimited?: () => any;
    },
  ): Promise<FileType[]> => {
    const permissionResponse = await request(
      Platform.select({
        ios: PERMISSIONS.IOS.PHOTO_LIBRARY,
        default: PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
      }),
    );

    if (permissionResponse !== 'granted') {
      if (permissionResponse === 'limited' && options.onPermissionLimited) {
        options.onPermissionLimited();
      } else {
        throw new Error('PERMISSION_ERROR_' + permissionResponse);
      }
    }

    const pick = await ImagePicker.openPicker(options);

    let output: FileType[] = [];

    const renameImage = (image: FileType) => {
      image.filename = (image.filename || '').split('.HEIC')[0];
      image.name = (image.name || '').split('.HEIC')[0];
      return image;
    };

    if (Array.isArray(pick)) {
      pick.forEach(image => {
        if (!image) {
          return;
        }
        let i: FileType = {
          ...image,
          uri: image.path,
          type: image.mime || '*/*',
          size: image.size + '',
          name: image.filename || this._extractFileNameFromPath(image.path),
        };

        if (options.changeFileNameExtensionFromHEICToJpg) {
          i = renameImage(i);
        }

        output.push(i);
      });
    } else {
      // @ts-ignore
      let i: FileType = {
        ...pick,
        uri: pick.path,
        type: pick.mime || '*/*',
        size: pick.size,
        name: pick.filename || this._extractFileNameFromPath(pick.path),
      };

      if (options.changeFileNameExtensionFromHEICToJpg) {
        i = renameImage(i);
      }

      output.push(i);
    }

    return output;
  };

  /**
   * @todo: Support Video here
   * @param options
   */
  download = async (options: DownloadOptions) => {
    const {config, fs, android} = RNFetchBlob;
    await this.askWritePermission();

    const mimeType = mime.getType(options.filename || options.url) || '';

    if (Platform.OS === 'ios') {
      if (mimeType.startsWith('image')) {
        return await CameraRoll.saveToCameraRoll(options.url);
      }

      return Linking.openURL(options.url);
    }

    const filename = options.filename || /[\w.]+$/.exec(options.url);

    const download = await config({
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: fs.dirs.DownloadDir + '/' + filename,
        mediaScannable: true,
      },
      overwrite: true,
    }).fetch('GET', options.url);

    if (options.openFile && Platform.OS === 'android') {
      android.actionViewIntent(download.path(), mimeType);
    }
    if (Platform.OS === 'android') {
      await fs.scanFile([{path: download.path(), mime: mimeType}]);
    }

    return download;
  };

  /**
   * @see https://github.com/react-native-community/react-native-share#openoptions
   *
   * But I will handle the base64 encode for you
   */
  share = async (options: ShareOption) => {
    const getBase64 = async (url: string) => {
      if (url.startsWith('file')) {
        return url;
      }
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
      });
      const base64 = new Buffer(response.data, 'binary').toString('base64');
      const mimeType = mime.getType(url);
      return `data:${mimeType};base64,${base64}`;
    };

    if (!options.isBase64) {
      return await Share.shareSingle(options);
    }

    if (options.url) {
      options.url = await getBase64(options.url);
    }
    if (options.urls) {
      options.urls = await Promise.all(options.urls.map(url => getBase64(url)));
    }

    return await Share.shareSingle(options);
  };

  // getMime = ({uri}: { uri: string }) => {
  //     return mime.getType(uri);
  // };
  //
  // getExtensionFromMime = (mimeType: string) => {
  //     return mime.getExtension(mimeType);
  // };
  //
  // extractFileNameFromUri = ({uri, removeQueryString = false}: { uri: string, removeQueryString?: boolean }) => {
  //     // Remove all content before last /
  //     let output = uri.substr(uri.lastIndexOf('/') + 1);
  //
  //     if (removeQueryString) output = output.replace(/([?#].*)$/, '');
  //
  //     return output;
  // };
  //
  // extractExtensionFromFilename = ({filename}: { filename: string }) => {
  //     return filename.replace(/^.*\./, '');
  // };
  //
  // guessUriInfo = ({uri, removeQueryString = false}: { uri: string, removeQueryString?: boolean }) => {
  //     const filename = this.extractFileNameFromUri({uri, removeQueryString});
  //     const extension = this.extractExtensionFromFilename({filename});
  //     const mimeType = this.getMime({uri: filename}) || '*/*';
  //
  //     return {
  //         filename,
  //         extension,
  //         mimeType
  //     }
  // };
  //
  // viewFile = async ({uri, progressCallback, openStoreIfNotSupported = true}: {
  //     uri: string,
  //     progressCallback?: ProgressCallback,
  //     openStoreIfNotSupported?: boolean
  // }) => {
  //     const {config, android} = RNFetchBlob;
  //
  //     if (Platform.OS === 'ios') {
  //         await Linking.openURL(uri);
  //         return;
  //     }
  //
  //     let {extension, mimeType} = this.guessUriInfo({uri});
  //
  //     let localUri: string | null = null;
  //
  //     if (uri.startsWith('file') || uri.startsWith('content')) {
  //         localUri = uri;
  //     } else {
  //         const prepared = config({
  //             fileCache: true,
  //             overwrite: true,
  //             appendExt: extension
  //         })
  //             .fetch('GET', uri);
  //
  //         if (progressCallback) {
  //             prepared.progress(progressCallback);
  //         }
  //
  //         const download = await prepared;
  //         localUri = download.path();
  //         if (typeof download.respInfo.headers === 'object') {
  //             const {['content-type']: contentType1, ['Content-Type']: contentType2} = download.respInfo.headers as Record<string, any>;
  //             if (contentType1 || contentType2) {
  //                 mimeType = (contentType1 || contentType2) as string;
  //             }
  //         }
  //     }
  //     if (!mimeType) {
  //         mimeType = this.getMime({uri: localUri});
  //     }
  //
  //     try {
  //         await android.actionViewIntent(localUri, mimeType || '*/*');
  //     } catch (e) {
  //         if (e.message === 'NO_ACTIVITY' && openStoreIfNotSupported) {
  //             return Alert.alert(
  //                 translate('file_not_supported'),
  //                 translate('download_supported_app'),
  //                 [
  //                     {text: translate('cancel'), style: 'cancel'},
  //                     {
  //                         text: translate('open_store'), onPress: () => {
  //                             return Linking.openURL(`https://play.google.com/store/search?q=${extension}%20viewer`);
  //                         }
  //                     }
  //                 ]
  //             );
  //         }
  //         throw new Error('FILE_NOT_SUPPORTED');
  //     }
  // }
}

export default new File();
