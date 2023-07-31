import React, {memo, useMemo, useState} from 'react';
import {ScreenScrollWrapper, ScreenWrapper} from '@/components/ScreenWrapper';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {usePost} from '@/store/posts';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {HTMLRenderer} from '@/components/Views/HTMLRender';
import {removeAccents} from '@/utils/string';
import {ImageURISource, StyleSheet, View} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {
  requestCommentByPostId,
  requestCommentPost,
} from '@/store/comments/functions';
import {ParamsCommentPostInterface, useCommentByQuery} from '@/store/comments';
import {CommentItem} from '@/screens/Home/screens/Forum/components/CommentItem';
import LoaderRender from '@/components/Views/LoaderRender';
import {styled} from '@/global';
import {Medium} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {InsertPost} from '@/components/Post';
import {getInfo} from '@/store/user';
import {noAvatarUri} from '@/components/Avatar';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {ParamsPostFunctionType} from '@/components/Post/types';
import {BaseRefreshControl} from '@/components/Common/BaseRefreshControl';
import useAutoToastError from '@/hooks/useAutoToastError';
import WebView from 'react-native-webview';

export interface BlogInterface {
  idBlog?: number;
  page: number;
  per_page: number;
  post: number;
}
export const BlogScreen = memo(function BlogScreen() {
  const {idBlog} = useNavigationParams<BlogInterface>();

  const detailsBlog = usePost((idBlog || '').toString());
  const comments = useCommentByQuery('comments');
  const user = getInfo();
  console.log('check =', detailsBlog.content.rendered);

  const [params, setParams] = useState<BlogInterface>({
    page: 1,
    per_page: 10,
    post: idBlog || 0,
  });

  const avatarImageSource: ImageURISource = useMemo(() => {
    if (!user || !user.avatar_url) {
      return {uri: noAvatarUri};
    }

    return {
      uri: user.avatar_url,
    };
  }, [user]);

  const {value, call, error, loading} = useAsyncEffect(async () => {
    return requestCommentByPostId(params);
  }, [params]);

  const [{error: errorPost}, postComment] = useAsyncFn(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    async (value: ParamsPostFunctionType) => {
      const content = value.content;
      const paramsPost: ParamsCommentPostInterface = {
        content: content,
        post: idBlog || 0,
      };
      const data = await requestCommentPost(paramsPost);
      if (data) {
        await call();
      }
      await requestCommentPost(paramsPost);
    },
    [],
  );

  useAutoToastError(error);
  useAutoToastError(errorPost);

  if (!detailsBlog) {
    return null;
  }

  return (
    <ScreenWrapper>
      <DynamicHeader title={`${detailsBlog.title.rendered}`} />
      {!loading ? (
        <ScreenScrollWrapper
          refreshControl={
            <BaseRefreshControl
              refreshing={loading}
              onRefresh={call || false}
            />
          }>
          <View style={styles.container}>
            <HTMLRenderer
              htmlContent={removeAccents(detailsBlog?.content.rendered)}
            />
          </View>
          <InsertPost
            submitPostFn={postComment}
            placeholder={'Nhập bình luận'}
            avatarImageSource={avatarImageSource}
            includePickFile={false}
          />
          {comments.length > 0 ? (
            <STitle>
              {comments.length} thoughts on "
              {detailsBlog.title.rendered.toUpperCase()}"
            </STitle>
          ) : (
            ''
          )}
          <View>
            {comments?.map(item => {
              // @ts-ignore
              return <CommentItem key={item.id} item={item} />;
            })}
          </View>
        </ScreenScrollWrapper>
      ) : (
        <SLoad />
      )}
    </ScreenWrapper>
  );
});

const SLoad = styled(LoaderRender)`
  padding: 10px;
`;

const STitle = styled(Medium)`
  font-size: 15px;
  padding: 10px;
  color: ${Colors.gray1};
`;

const styles = StyleSheet.create({
  container: {
    padding: 10,
    marginBottom: getBottomSpace() + 30,
    flex: 1,
  },
});

export default BlogScreen;
