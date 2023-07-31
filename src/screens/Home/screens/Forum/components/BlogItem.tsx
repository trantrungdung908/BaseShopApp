import {ActivityIndicator, StyleSheet, ViewProps} from 'react-native';
import React, {memo, useState} from 'react';
import {styled} from '@/global';
import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import FastImage from 'react-native-fast-image';
import {RawPostsInterface, usePost} from '@/store/posts';
import {IC_ARROW_RIGHT} from '@/assets';
import {HTMLRenderer} from '@/components/Views/HTMLRender';
import {removeAccents} from '@/utils/string';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestPostsList} from '@/store/posts/functions';
import {client} from '@/libs';
import {requestGetMediaById} from '@/store/media/functions';
import {useMedia, useMediaByQuery} from '@/store/media';
import useAutoToastError from '@/hooks/useAutoToastError';

interface BlogItemInterface extends ViewProps {
  onPress?: () => void;
  item: RawPostsInterface;
  index: number;
}

export const BlogItem = memo(function BlogItem({
  onPress,
  item,
  index,
}: BlogItemInterface) {
  // @ts-ignore
  const post = usePost(item);
  const media = useMedia(post?.featured_media.toString());

  const {call, error, loading} = useAsyncEffect(async () => {
    return requestGetMediaById(post?.featured_media || 0);
  }, []);

  if (!post) {
    return null;
  }
  return (
    <WrapContent
      style={index === 0 ? styles.noSpace : styles.mgTop}
      onPress={onPress}>
      {!loading ? (
        <SImageBlogs
          source={{
            uri: media
              ? media?.guid.rendered
              : 'https://cokhihaphuong.com/wp-content/uploads/woocommerce-placeholder-768x768.png',
          }}
        />
      ) : (
        <SActivityIndicator />
      )}
      <ViewInfo>
        <SText numberOfLines={1}>{post.title.rendered}</SText>
        <SDesc>
          <HTMLRenderer htmlContent={removeAccents(post?.content.rendered)} />
        </SDesc>
        <ViewMore>
          <STextMore>{'Xem thêm'}</STextMore>
          <SIcon source={IC_ARROW_RIGHT} />
        </ViewMore>
      </ViewInfo>
    </WrapContent>
  );
});

const WrapContent = styled.TouchableOpacity`
  flex-direction: row;
  padding: 20px 16px;
  background-color: ${Colors.white};
`;

const SImageBlogs = styled(FastImage)`
  width: ${scale(147)}px;
  height: ${scale(98)}px;
  border-radius: 10px;
`;
const SIcon = styled.Image`
  width: ${scale(15)}px;
  height: ${scale(15)}px;
`;
const SText = styled(Medium)`
  font-size: 16px;
  color: ${Colors.gray1};
`;
const SDesc = styled.View`
  overflow: hidden;
  max-height: ${scale(45)}px;
`;
const ViewMore = styled.TouchableOpacity`
  align-self: flex-end;
  flex-direction: row;
  align-items: center;
  margin-top: auto;
`;

const STextMore = styled(Regular)`
  font-size: 14px;
  color: ${Colors.gray1};
`;

const ViewInfo = styled.View`
  margin-left: 12px;
  max-width: ${scale(180)}px;
`;

const SActivityIndicator = styled(ActivityIndicator)`
  width: ${scale(34)}px;
`;

const styles = StyleSheet.create({
  mgTop: {
    marginTop: 8,
  },
  noSpace: {
    marginTop: 0,
  },
});
