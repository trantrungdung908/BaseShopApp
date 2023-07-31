import * as React from 'react';
import {memo, useCallback, useMemo} from 'react';
import styled from 'styled-components/native';
import {RawPostInterface} from '../../store/posts/types';
import {
  DeletePostFunctionType,
  EditPostFunctionType,
  ReactPostFunctionType,
} from '../../types';
import EditPostModal from '../Posts/EditPostModal';
import {RawCommentInterface} from '../../store/comments/types';

import {
  TouchableWithoutFeedback,
  Clipboard,
  TouchableOpacity,
  View,
} from 'react-native';
import {isSmallDevice} from '../../utils/scale';
import StringHelper from '@/utils/StringHelper';
import {ReactionEnum} from '@/types';
import useAsyncFn from '@/hooks/useAsyncFn';
import useBoolean from '@/hooks/useBoolean';
import ToastService from '@/services/ToastService';

const SWrapper = styled.View`
  background-color: ${props => props.theme.backgroundColor};
  border-top-left-radius: 6px;
  border-top-right-radius: 6px;
`;

const STopBar = styled.View`
  padding: 8px 16px;
`;

const SPostMinimized = styled.View`
  flex-direction: row;
`;

const SContentWrapper = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const SName = styled.Text`
  color: ${props => props.theme.grey1};
  font-size: 13px;
  margin-bottom: 4px;
`;

const SContent = styled.Text`
  font-size: 15px;
  line-height: 18px;
  color: ${props => props.theme.grey3};
`;

const SReactionsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: 20px;
  background-color: ${props => props.theme.backgroundColor};
`;

const SReactionImage = styled.Image`
  width: 40px;
  height: 40px;
  margin-right: ${isSmallDevice ? 0 : 16}px;
`;

const SReactionIndicator = styled.ActivityIndicator`
  margin-right: 16px;
`;

const SActions = styled.View`
  border-top-width: 0.5px;
  border-top-color: ${props => props.theme.underlayColor};
`;

const SActionWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 12px 16px;
`;

const SActionIndicator = styled.ActivityIndicator`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;

const SActionText = styled.Text`
  font-size: 15px;
  line-height: 16px;
  color: ${props => props.theme.grey1};
`;

const ReactionItem = memo(
  ({
    reaction,
    post,
    reactFn,
    onCloseRequest,
  }: {
    reaction: ReactionEnum;
    post: RawPostInterface | RawCommentInterface;
    reactFn: ReactPostFunctionType;
    onCloseRequest: () => any;
  }) => {
    const [reactState, react] = useAsyncFn(async () => {
      await reactFn({
        postId: post.id,
        postHid: post.hid,
        postToken: post.token,
        reaction: reaction,
        type: post.type,
      });

      return onCloseRequest();
    }, [post, reactFn, reaction, onCloseRequest]);

    return (
      <TouchableWithoutFeedback key={reaction} onPress={react}>
        {reactState.loading ? (
          <SReactionIndicator size={40} />
        ) : (
          // <SReactionImage source={Reaction.getReactionImage(reaction)} />
          <></>
        )}
      </TouchableWithoutFeedback>
    );
  },
);

interface Props {
  post: RawPostInterface | RawCommentInterface;
  deletePostFn: DeletePostFunctionType;
  editPostFn: EditPostFunctionType;
  reactPostFn: ReactPostFunctionType;
  onCloseRequest: () => any;
}

const PostActionsSheetContent = memo(
  ({post, editPostFn, deletePostFn, reactPostFn, onCloseRequest}: Props) => {
    const [isEditModalVisible, setEditModalOn, setEditModalOff] =
      useBoolean(false);
    const [isDeleteDialogVisible, setDeleteDialogOn, setDeleteDialogOff] =
      useBoolean(false);
    // const user = useUser(post ? post.user_id : undefined);
    // const me = useMe()!;

    const [deletePostState, deletePost] = useAsyncFn(async () => {
      if (!post) {
        return;
      }

      await deletePostFn({
        postId: post.id,
        postHid: post.hid,
        postToken: post.token,
        type: post.type,
      });
    }, [deletePostFn, post]);

    const editModalRequestClose = useCallback(() => {
      setEditModalOff();
      onCloseRequest();
    }, [onCloseRequest]);

    const postContent = useMemo(() => {
      return StringHelper(post.content)
        .stripHtml()
        .removeReductionMentionText()
        .toString();
    }, [post.content]);

    const onCopy = useCallback(() => {
      Clipboard.setString(postContent || '');
      onCloseRequest();
      ToastService.show('post/content_copied', 0.5, false, true);
    }, [onCloseRequest, postContent]);

    if (!post) {
      return null;
    }

    return (
      <SWrapper>
        <View>
          <STopBar>
            <SPostMinimized>
              {/*<Avatar size={40} userId={post.user_id} />*/}

              <SContentWrapper>
                {/*<SName>{user ? user.name : post.username}</SName>*/}
                <SContent numberOfLines={1}>{postContent}</SContent>
              </SContentWrapper>
            </SPostMinimized>

            <SReactionsWrapper>
              {Object.values(ReactionEnum).map(reaction => (
                <ReactionItem
                  key={reaction}
                  reactFn={reactPostFn}
                  post={post}
                  reaction={reaction}
                  onCloseRequest={onCloseRequest}
                />
              ))}
            </SReactionsWrapper>
          </STopBar>

          <SActions>
            {postContent ? (
              <TouchableOpacity onPress={onCopy} key={'copy'}>
                <SActionWrapper>
                  <SActionText>{'post/copy_content'}</SActionText>
                </SActionWrapper>
              </TouchableOpacity>
            ) : null}
            {/*{post.user_id == me.id && post.metatype !== 'system' && (*/}
            <TouchableOpacity onPress={setEditModalOn} key={'edit'}>
              <SActionWrapper>
                <SActionText>{'post/update'}</SActionText>
              </SActionWrapper>
            </TouchableOpacity>
            {/*)}*/}
            {/*{post.user_id == me.id && post.metatype !== 'system' && (*/}
            <TouchableOpacity
              key={'delete'}
              onPress={setDeleteDialogOn}
              disabled={deletePostState.loading}>
              <SActionWrapper>
                {deletePostState.loading && <SActionIndicator />}
                <SActionText>
                  {deletePostState.loading ? 'post/deleting' : 'post/delete'}
                </SActionText>
              </SActionWrapper>
            </TouchableOpacity>
            {/*)}*/}
          </SActions>

          <EditPostModal
            post={post}
            isVisible={isEditModalVisible}
            onCloseRequest={editModalRequestClose}
            editPostFn={editPostFn}
          />

          {/*<ConfirmationDialog*/}
          {/*  isVisible={isDeleteDialogVisible}*/}
          {/*  onCloseRequest={setDeleteDialogOff}*/}
          {/*  content={translate('post/delete_confirmation_text', {*/}
          {/*    type: translate('post/' + post.type),*/}
          {/*  })}*/}
          {/*  buttons={[*/}
          {/*    {text: translate('post/cancel')},*/}
          {/*    {*/}
          {/*      text: translate('post/delete'),*/}
          {/*      color: '#FB4444',*/}
          {/*      onPress: deletePost,*/}
          {/*    },*/}
          {/*  ]}*/}
          {/*/>*/}
        </View>
      </SWrapper>
    );
  },
);

PostActionsSheetContent.displayName = 'PostActionsSheetContent';

export default PostActionsSheetContent;
