import React, {memo, useCallback, useRef} from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {EditPostFunctionType} from '../../types';
import {ActivityIndicator, Platform} from 'react-native';
import {RawPostInterface} from '../../store/posts/types';
import {RawCommentInterface} from '../../store/comments/types';
import StringHelper from '@/utils/StringHelper';
import Icon from '@/components/Icon';
import useAsyncFn from '@/hooks/useAsyncFn';

const SModal = styled(Modal as any)`
  margin: 0;

  justify-content: flex-end;
`;

const SWrapper = styled.KeyboardAvoidingView`
  background-color: ${props => props.theme.backgroundColor};
`;

const SContainer = styled.View`
  margin: 8px 16px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-height: 100px;
`;

const SInput = styled.TextInput.attrs(props => ({
  placeholderTextColor: props.theme.grey4,
}))`
  background-color: ${props => props.theme.grey6};
  padding: 12px;
  line-height: 20px;
  border-radius: 22px;
  flex: 1;
  color: ${props => props.theme.grey1};
`;

const SSendIconWrapper = styled.View`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  margin-left: 16px;
`;

const SSendIcon = styled(Icon)`
  font-size: 26px;
  color: ${props => props.theme.primaryColor};
`;

const EditPostContent = memo(
  ({
    post,
    editPostFn,
    onCloseRequest,
  }: Pick<Props, 'post' | 'editPostFn' | 'onCloseRequest'>) => {
    const value = useRef(
      post
        ? StringHelper(post.content)
            .stripHtml({withLineBreak: true})
            .removeReductionMentionText()
            .toString()
        : '',
    );

    const setValue = useCallback(
      (text: string) => (value.current = text),
      [value],
    );

    const [editState, edit] = useAsyncFn(async () => {
      await editPostFn({
        postId: post.id,
        postHid: post.hid,
        postToken: post.token,
        content: value.current,
        type: post.type,
      });

      onCloseRequest();
    }, [editPostFn, post, value, onCloseRequest]);

    return (
      <SWrapper enabled={Platform.OS === 'ios'} behavior={'padding'}>
        <SContainer>
          <SInput
            placeholder={'post/enter_update_conent'}
            autoFocus={true}
            onChangeText={setValue}
            defaultValue={value.current}
            multiline={true}
          />
          <SSendIconWrapper>
            {editState.loading ? (
              <ActivityIndicator size={26} />
            ) : (
              <SSendIcon name={'send'} onPress={edit} />
            )}
          </SSendIconWrapper>
        </SContainer>
      </SWrapper>
    );
  },
);

interface Props {
  post: RawPostInterface | RawCommentInterface;
  isVisible: boolean;
  onCloseRequest: () => any;
  editPostFn: EditPostFunctionType;
}

const EditPostModal = ({
  isVisible,
  post,
  onCloseRequest,
  editPostFn,
}: Props) => {
  return (
    <SModal
      isVisible={isVisible}
      onDismiss={onCloseRequest}
      onBackButtonPress={onCloseRequest}
      onSwipeComplete={onCloseRequest}
      onBackdropPress={onCloseRequest}
      swipeDirection={'down'}>
      <EditPostContent
        post={post}
        editPostFn={editPostFn}
        onCloseRequest={onCloseRequest}
      />
    </SModal>
  );
};

EditPostModal.displayName = 'EditPostModal';

export default EditPostModal;
