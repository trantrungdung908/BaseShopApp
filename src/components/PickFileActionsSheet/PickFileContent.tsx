import React, {memo, useCallback} from 'react';
import {PickFileContentProps} from './types';
import {ActionSheetRow} from '../ActionSheet';
import {TakePhoto} from './TakePhoto';
import Modal from 'react-native-modal';
import styled from 'styled-components/native';
import {PermissionsAndroid, Platform, View} from 'react-native';
import useBoolean from '@/hooks/useBoolean';
import File from '@/services/File';
import {IC_CAMERA, IC_IMAGE} from '@/assets';

const PickFileContent = memo(
  ({
    onFilePicked,
    pickFileOptions,
    pickImageOptions,
    takeCameraOptions,
    includeTakeCamera = true,
    includePickFile = true,
  }: PickFileContentProps) => {
    const [visible, setVisibleTrue, setVisibleFalse] = useBoolean(false);

    const onPressTakeCameraAndroid = useCallback(async () => {
      await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
      await requestWriteStoragePermission();
      setVisibleTrue();
    }, [setVisibleTrue]);

    const onPressTakeCamera = useCallback(async () => {
      const files = await File.takeCamera(takeCameraOptions || {});
      onFilePicked(files);
    }, [onFilePicked, takeCameraOptions]);

    const onSelectFromGallery = useCallback(async () => {
      const files = await File.pickImage(pickImageOptions || {});
      onFilePicked(files);
    }, [onFilePicked, pickImageOptions]);

    const onPickFile = useCallback(async () => {
      const files = await File.pick({
        multiple: true,
        ...(pickFileOptions || {}),
      });

      // @ts-ignore
      onFilePicked(files);
    }, [onFilePicked, pickFileOptions]);

    return (
      <Container>
        {!!includeTakeCamera && (
          <ActionSheetRow
            onPress={
              Platform.OS === 'android'
                ? onPressTakeCameraAndroid
                : onPressTakeCamera
            }
            icon={IC_CAMERA}
            text={'Chụp ảnh'}
          />
        )}
        <ActionSheetRow
          onPress={onSelectFromGallery}
          icon={IC_IMAGE}
          text={'Chọn ảnh từ thiết bị'}
        />
        {!!includePickFile && (
          <ActionSheetRow
            onPress={onPickFile}
            icon={IC_IMAGE}
            text={'Lấy file từ máy'}
          />
        )}
        {Platform.OS === 'android' && (
          <SWrapper
            isVisible={visible}
            onDismiss={setVisibleFalse}
            onBackdropPress={setVisibleFalse}
            onBackButtonPress={setVisibleFalse}
            animationIn="fadeIn"
            animationOut="fadeOut"
            backdropTransitionOutTiming={0}
            avoidKeyboard={true}>
            <SContainer>
              <TakePhoto
                onCloseRequest={setVisibleFalse}
                onFilePicked={onFilePicked}
              />
            </SContainer>
          </SWrapper>
        )}
      </Container>
    );
  },
);

const Container = styled.View`
  margin-bottom: 32px;
`;

const SWrapper = styled(Modal)`
  margin: 0;
`;

const SContainer = styled(View)`
  background-color: black;
  width: 100%;
  height: 100%;
`;

PickFileContent.displayName = 'PickFileContent';

export default PickFileContent;

export const requestWriteStoragePermission = async () => {
  try {
    return await Platform.select({
      android: PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        {
          title: 'Download Files Permission',
          message: 'Loigiai.com yêu cầu quyền truy cập để lấy ảnh',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      ),
    });
  } catch (err) {}
};
