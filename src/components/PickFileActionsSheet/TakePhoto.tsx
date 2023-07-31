import React, {memo, useCallback, useEffect, useRef, useState} from 'react';
import {
  Animated,
  Image,
  Platform,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {PhotoPreview} from './PhotoPreview';
import {FileType} from '@/services/File';
import {useToggle} from '@/hooks/useToggle';
import {DynamicHeaderTransparent} from '@/components/Header/DynamicHeader';
import {Camera, useCameraDevices} from 'react-native-vision-camera';
import {LoadingView} from '@/components/Views/LoadingView';
import {IC_CHANGE_CAMERA} from '@/assets';

interface Props {
  onCloseRequest: () => any;
  onFilePicked: (files: FileType[]) => any;
  onPickFileError?: (error: any) => void;
}

export const TakePhoto = memo(
  ({onCloseRequest, onFilePicked, onPickFileError}: Props) => {
    const devices = useCameraDevices('wide-angle-camera');
    const camera = useRef<Camera>(null);

    useEffect(() => {
      const entry = StatusBar.pushStackEntry({
        barStyle: 'light-content',
      });

      return () => {
        StatusBar.popStackEntry(entry);
      };
    }, []);

    const anim = useRef<Animated.Value>(new Animated.Value(1));

    const [fileType, setFileType] = useState<FileType | undefined>(undefined);

    const [isBack, toggleIsBack] = useToggle(true);

    useEffect(() => {
      Animated.timing(anim.current, {
        toValue: fileType ? 0 : 1,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }, [fileType]);

    const onRetry = useCallback(() => {
      setFileType(undefined);
    }, [setFileType]);

    const onOk = useCallback(
      (value: FileType) => {
        setFileType(undefined);
        onFilePicked([value]);
        onCloseRequest();
      },
      [onFilePicked, onCloseRequest],
    );

    const takePicture = useCallback(async () => {
      if (camera.current) {
        try {
          const data = await camera.current.takePhoto();
          const uri = data.path || '';
          const fileType1: FileType = {
            name: extractFileNameFromPath(uri),
            // @ts-ignore
            size: '',
            type: 'image/jpeg',
            uri: Platform.OS === 'android' ? 'file://' + uri : uri,
          };
          setFileType(fileType1);
        } catch (error) {
          onPickFileError && onPickFileError(error);
          onCloseRequest();
        }
      }
    }, [onPickFileError, onCloseRequest]);
    if (devices.back === undefined) {
      return <LoadingView />;
    }

    return (
      <View style={styles.container}>
        <Camera
          device={devices.back}
          isActive={true}
          enableZoomGesture
          ref={camera}
          photo={true}
          style={styles.preview}>
          <DynamicHeaderTransparent title={''} />
        </Camera>
        <Animated.View style={[styles.footer, {opacity: anim.current}]}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={onCloseRequest}>
            <Text style={styles.buttonText}>{'Huỷ bỏ'}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={takePicture} style={styles.capture}>
            <View style={styles.circle} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.flipButton} onPress={toggleIsBack}>
            <Image
              resizeMode="contain"
              style={styles.flipIcon}
              source={IC_CHANGE_CAMERA}
            />
          </TouchableOpacity>
        </Animated.View>
        <PhotoPreview file={fileType} onRetry={onRetry} onOk={onOk} />
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footer: {
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    height: 100,
  },
  capture: {
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignSelf: 'center',
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  circle: {
    height: 48,
    width: 48,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
  },
  flipButton: {
    position: 'absolute',
    right: 16,
    alignSelf: 'center',
  },
  flipIcon: {
    width: 40,
    height: 40,
    tintColor: '#FFFFFF',
  },
  cancelButton: {
    alignSelf: 'center',
    position: 'absolute',
    left: 0,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 20,
  },
});

export const extractFileNameFromPath = (path: string) => {
  const splitFromPath = /\w+.\w+$/.exec(path);
  return splitFromPath && splitFromPath[0]
    ? splitFromPath[0]
    : Math.random().toString(36).substring(2) + '.jpg';
};
