import PhotoViewContent from './PhotoViewContent';
import * as React from 'react';
import {ComponentProps, memo, useEffect} from 'react';
import Modal, {ModalProps} from 'react-native-modal';
import styled from 'styled-components/native';
import StatusBarHelper from '@/utils/StatusBarHelper';

const SModal = styled(Modal)`
  margin: 0;
  width: 100%;
  height: 100%;
`;

type Props = {
  isVisible: boolean;
  onCloseRequest: () => any;
  images: ComponentProps<typeof PhotoViewContent>['images'];
  initialIndex?: ComponentProps<typeof PhotoViewContent>['initialIndex'];
} & Partial<ModalProps>;

const PhotoViewModal = memo(
  ({isVisible, onCloseRequest, images, initialIndex, ...props}: Props) => {
    useEffect(() => {
      let stack = isVisible
        ? StatusBarHelper.pushStackEntry({
            translucent: false,
            showHideTransition: 'fade',
            networkActivityIndicatorVisible: true,
            animated: true,
            backgroundColor: '#000',
            hidden: false,
            barStyle: 'light-content',
          })
        : null;

      return () => {
        stack && stack.pop();
      };
    }, [isVisible]);

    return (
      <SModal
        isVisible={isVisible}
        onBackdropPress={onCloseRequest}
        onDismiss={onCloseRequest}
        onBackButtonPress={onCloseRequest}
        onSwipeComplete={onCloseRequest}
        useNativeDriver={true}
        animationIn={'zoomIn'}
        animationOut={'zoomOut'}
        hideModalContentWhileAnimating={true}
        {...props}>
        <PhotoViewContent
          images={images}
          initialIndex={initialIndex}
          onCloseRequest={onCloseRequest}
        />
      </SModal>
    );
  },
);

PhotoViewModal.displayName = 'PhotoViewModal';

export default PhotoViewModal;
