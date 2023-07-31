import React, {ComponentProps, memo} from 'react';
import Modal from 'react-native-modal';
import PostListContent from './PostListContent';
import styled from 'styled-components/native';

const SModal = styled(Modal)`
  margin: 0;
`;

export type Props = {
  isVisible: boolean;
  onCloseRequest: () => any;
} & ComponentProps<typeof PostListContent>;
const PostListModal = memo(
  ({isVisible, onCloseRequest, ...postListContentProps}: Props) => {
    return (
      <SModal
        isVisible={isVisible}
        onDismiss={onCloseRequest}
        onBackButtonPress={onCloseRequest}
        onSwipeComplete={onCloseRequest}
        onBackdropPress={onCloseRequest}
        swipeDirection={'down'}
        propagateSwipe>
        <PostListContent
          onCloseRequest={onCloseRequest}
          {...postListContentProps}
        />
      </SModal>
    );
  },
);

PostListModal.displayName = 'PostListModal';

export default PostListModal;
