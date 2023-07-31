import * as React from 'react';
import {memo} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {
  DeletePostFunctionType,
  EditPostFunctionType,
  ReactPostFunctionType,
} from '../../types';
import PostActionsSheetContent from './PostActionsSheetContent';
import {RawPostInterface} from '../../store/posts/types';
import {RawCommentInterface} from '../../store/comments/types';

const SModal = styled(Modal)`
  justify-content: flex-end;
  margin: 0;
`;

interface Props {
  post: RawPostInterface | RawCommentInterface;
  isVisible: boolean;
  onCloseRequest: () => void;
  reactPostFn: ReactPostFunctionType;
  editPostFn: EditPostFunctionType;
  deletePostFn: DeletePostFunctionType;
}
const PostActionsSheet = memo(
  ({
    post,
    isVisible,
    onCloseRequest,
    deletePostFn,
    editPostFn,
    reactPostFn,
  }: Props) => {
    return (
      <SModal
        isVisible={isVisible}
        onDismiss={onCloseRequest}
        onBackButtonPress={onCloseRequest}
        onBackdropPress={onCloseRequest}
        onSwipeComplete={onCloseRequest}
        swipeDirection={'down'}>
        <PostActionsSheetContent
          post={post}
          deletePostFn={deletePostFn}
          editPostFn={editPostFn}
          reactPostFn={reactPostFn}
          onCloseRequest={onCloseRequest}
        />
      </SModal>
    );
  },
);

PostActionsSheet.displayName = 'PostActionsSheet';

export default PostActionsSheet;
