import * as React from 'react';
import {ComponentProps, memo, useCallback, useEffect} from 'react';
import {FlatList, FlatListProps, InteractionManager} from 'react-native';
import styled from 'styled-components/native';
import {RawPostInterface} from '../../store/posts/types';
import {
  DeletePostFunctionType,
  EditPostFunctionType,
  OnPressPostOrComment,
} from '../../types';
import Post from '../Post/Post';
import {RawCommentInterface} from '../../store/comments/types';
import {useAsyncFn} from '@/hooks/useAsyncFn';

const SWrapper = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const keyExtractor = (item: RawPostInterface | RawCommentInterface) => item.id;

interface Props {
  posts: (RawPostInterface | RawCommentInterface)[];
  refreshFn: () => Promise<any>;
  reactFn: ComponentProps<typeof Post>['reactFn'];
  loadMoreFn?: () => Promise<any>;
  editPostFn: EditPostFunctionType;
  deletePostFn: DeletePostFunctionType;
  onPostPress?: OnPressPostOrComment;
  pressCommentsFn?: OnPressPostOrComment;
  flatListProps?: FlatListProps<any>;
}
const PostList = memo(
  ({
    posts,
    loadMoreFn,
    reactFn,
    refreshFn,
    editPostFn,
    deletePostFn,
    onPostPress,
    pressCommentsFn,
    ...flatListProps
  }: Props) => {
    // Just in case refreshFn is undefined
    const [refreshState, refresh] = useAsyncFn(
      refreshFn ? refreshFn : async () => {},
      [refreshFn],
      {loading: true},
    );

    useEffect(() => {
      InteractionManager.runAfterInteractions(() => {
        refresh && refresh(); // Just in case refresh is undefined
      });
    }, []);

    const renderItem = useCallback(
      ({item}: {item: RawPostInterface | RawCommentInterface}) => {
        return (
          <Post
            post={item}
            reactFn={reactFn}
            editPostFn={editPostFn}
            deletePostFn={deletePostFn}
            onPress={onPostPress}
            pressCommentsFn={pressCommentsFn}
          />
        );
      },
      [reactFn, editPostFn, deletePostFn, onPostPress, pressCommentsFn],
    );

    return (
      <SWrapper>
        <FlatList
          data={posts}
          renderItem={renderItem}
          keyExtractor={keyExtractor}
          refreshing={refreshState.loading}
          onRefresh={refresh}
          keyboardShouldPersistTaps={'always'}
          {...flatListProps}
        />
      </SWrapper>
    );
  },
);

PostList.displayName = 'PostList';

export default PostList;
