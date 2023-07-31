import React, {ComponentProps, memo} from 'react';
import styled from 'styled-components/native';
import Header from './Header';
import PostList from '../Posts/PostList';
import InsertPost from '../InsertPost/InsertPost';
import {Platform} from 'react-native';

const SWrapper = styled.KeyboardAvoidingView`
  flex: 1;

  background-color: ${props => props.theme.backgroundColor};
`;

type Props = {
  type: 'post' | 'comment';
  onCloseRequest: () => any;
} & ComponentProps<typeof PostList> &
  ComponentProps<typeof InsertPost>;
const PostListContent = memo(
  ({
    type,
    onCloseRequest,
    placeholder,
    submitPostFn,
    ...postListProps
  }: Props) => {
    return (
      <SWrapper enabled={Platform.OS === 'ios'} behavior={'padding'}>
        <Header type={type} onCloseRequest={onCloseRequest} />

        <PostList {...postListProps} />

        <InsertPost
          placeholder={placeholder}
          submitPostFn={submitPostFn}
          type={type}
        />
        {/*<BottomBarView />*/}
      </SWrapper>
    );
  },
);

PostListContent.displayName = 'PostListContent';

export default PostListContent;
