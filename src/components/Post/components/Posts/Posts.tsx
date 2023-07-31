import * as React from 'react';
import {ComponentProps, memo} from 'react';
import {ActivityIndicator} from 'react-native';
import styled from 'styled-components/native';
import {
  DeletePostFunctionType,
  EditPostFunctionType,
  OnPressPostOrComment,
  PressCommentsFunctionType,
  RawPostInterface,
} from '../../types';
import LoadMore from './LoadMore';
import Post from '../Post/Post';
import {RawCommentInterface} from '../../store/comments/types';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {Colors} from '@/themes';

const SWrapper = styled.View`
  width: 100%;
`;

const SLoadingWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 16px;
`;

const SLoadingText = styled.Text`
  font-size: 15px;
  color: ${Colors.gray6};
  margin-right: 16px;
`;

interface Props {
  posts: (RawPostInterface | RawCommentInterface)[];
  loadPostsFn: () => Promise<any>;
  loadMoreFn: () => Promise<any>;
  postReactionFn: ComponentProps<typeof Post>['reactFn'];
  deletePostFn: DeletePostFunctionType;
  editPostFn: EditPostFunctionType;
  pressCommentsFn?: PressCommentsFunctionType;
  onPostPress?: OnPressPostOrComment;
}
const Posts = memo(
  ({
    posts,
    loadMoreFn,
    loadPostsFn,
    postReactionFn,
    editPostFn,
    deletePostFn,
    pressCommentsFn,
    onPostPress,
  }: Props) => {
    const loadState = useAsyncFn(loadPostsFn, []);

    if (loadState.loading) {
      return (
        <SLoadingWrapper>
          <SLoadingText>Đang tải dữ liệu</SLoadingText>
          <ActivityIndicator size={20} />
        </SLoadingWrapper>
      );
    }

    return (
      <SWrapper>
        {(posts || []).map(post => (
          <Post
            key={post.id}
            post={post}
            reactFn={postReactionFn}
            editPostFn={editPostFn}
            deletePostFn={deletePostFn}
            onPress={onPostPress}
            pressCommentsFn={pressCommentsFn}
          />
        ))}
      </SWrapper>
    );
  },
);

Posts.displayName = 'Posts';

export default Posts;
