import * as React from 'react';
import {memo, useCallback, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Keyboard,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
// @ts-ignore
import HTML from 'react-native-render-html';
import styled from 'styled-components/native';
import {
  DeletePostFunctionType,
  EditPostFunctionType,
  OnPressPostOrComment,
  PressCommentsFunctionType,
  RawPostInterface,
  ReactionEnum,
  ReactPostFunctionType,
} from '../../types';
import PostActionsSheet from '../PostActionsSheet/PostActionsSheet';
import ReactedMembersModal from '../ReactedMembersModal/ReactedMembersModal';
import PostFile from './PostFile';
import {RawCommentInterface} from '../../store/comments/types';
import PostContent from './PostContent';
import ImageHelper from '@/components/Avatar/ImageHelper';
import useAsyncFn from '@/hooks/useAsyncFn';
import useBoolean from '@/hooks/useBoolean';
import PhotoViewModal from '@/components/PhotoView';
import {RawAttachmentInterface} from '@/types';
import {ImageSizeEnum} from '@/components/Avatar/types';
import Avatar from '@/components/Avatar';
import {HTMLRenderer} from '@/components/Views/HTMLRender';
import {Bold} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import Reaction from '@/components/Post/services/Reaction';
import TimeAgo from '@/components/Post/components/TimeAgo';
import {IC_STAR, IC_STAR_FILL} from '@/assets';

const SWrapper = styled.View`
  padding: 12px 0px;
  flex-direction: row;
`;

const TitleName = styled(Bold)`
  font-size: 14px;
`;

const SContentWrapper = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const SStatsWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-top: 12px;
`;

const SActions = styled.View`
  color: ${props => props.theme.grey3};
  line-height: 16px;
  flex-direction: row;
`;

const SReactions = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SStatText = styled.Text<{color?: string}>`
  font-size: 13px;
  color: ${props => props.color || Colors.gray3};
`;

const SImageScrollView = styled.ScrollView`
  height: 100px;
  margin: 12px 0;
`;

const SImage = styled.Image`
  width: 100px;
  height: 100px;
  border-radius: 4px;
  margin-right: 8px;
`;

const SReactionImage = styled.Image`
  width: 16px;
  height: 16px;
`;

const SLikeCountText = styled.Text`
  color: ${props => props.theme.primaryColor};
  font-size: 13px;
  margin-left: 8px;
`;

interface Props {
  post: RawPostInterface | RawCommentInterface;
  reactFn: ReactPostFunctionType;
  deletePostFn: DeletePostFunctionType;
  editPostFn: EditPostFunctionType;
  pressCommentsFn?: PressCommentsFunctionType;
  onPress?: OnPressPostOrComment;
  onLinkPress?: (link: string) => void;
  hideNumberOfComment?: boolean;
}

const Post = memo(
  ({
    post,
    reactFn,
    deletePostFn,
    editPostFn,
    pressCommentsFn,
    onPress,
    onLinkPress,
    hideNumberOfComment,
  }: Props) => {
    const [isModalVisible, setModalOpen, setModalClose] = useBoolean(false);
    const [isPhotoViewVisible, setPhotoViewOn, setPhotoViewOff] =
      useBoolean(false);
    const [
      isPostActionsSheetVisible,
      setActionsSheetVisibleOn,
      setActionsSheetVisibleOff,
    ] = useBoolean(false);
    const [isReactionsModalVisible, setReactionsModalOn, setReactionsModalOff] =
      useBoolean(false);
    const [initialViewPagerIndex, setInitialViewPagerIndex] = useState(0);
    // const user = useUser(post.user_id);
    // const me = useMe()!;

    const files = useMemo(() => {
      let output: {
        originImages: string[];
        smallImages: string[];
        files: RawAttachmentInterface[];
      } = {
        originImages: [],
        smallImages: [],
        files: [],
      };

      // const attachments =
      //   post.type === 'post' ? post.attachments : [post.attachment];
      // attachments.forEach(attachment => {
      //   if (!attachment || !(attachment.url || attachment.src)) {
      //     return;
      //   }
      //
      //   if (attachment.image == 1) {
      //     const url = attachment.url || (attachment.src as string);
      //     output.originImages.push(url);
      //     output.smallImages.push(
      //       ImageHelper(url).getImageSize(ImageSizeEnum.SIZE_2),
      //     );
      //   } else {
      //     //TODO: show preview content
      //     if (attachment.type !== 'link') {
      //       output.files.push(attachment);
      //     }
      //   }
      // });

      return output;
    }, [post]);

    const reactions = useMemo(() => {
      let mine: ReactionEnum | undefined;
      let subReactions = new Set<ReactionEnum>();
      let total = 0;
      post.reactions.forEach((reaction: {reaction: any}) => {
        subReactions.add(reaction.reaction);
        total++;
      });

      // noinspection JSUnusedAssignment
      return {
        mine,
        reactions: [...subReactions.values()],
        total,
      };
    }, [post]);

    const [defaultReactState, defaultReact] = useAsyncFn(() => {
      return reactFn({
        postId: post.id,
        postToken: post.token,
        postHid: post.hid,
        reaction: ReactionEnum.LIKE,
        type: post.type,
      });
    }, [reactFn, post]);

    const onPressComments = useCallback(() => {
      return pressCommentsFn && pressCommentsFn(post as RawPostInterface);
    }, [post, pressCommentsFn]);

    const selfOnPress = useCallback(() => {
      onPress && onPress(post);
    }, [post, onPress]);

    const onLongPress = useCallback(async () => {
      await Keyboard.dismiss();
      setTimeout(() => {
        setActionsSheetVisibleOn();
      }, 0);
    }, [setActionsSheetVisibleOn]);

    return (
      <TouchableOpacity onPress={selfOnPress} onLongPress={onLongPress}>
        <SWrapper>
          <TouchableOpacity onPress={setModalOpen}>
            <Avatar size={40} avatar={post.gavatar} />
          </TouchableOpacity>

          <SContentWrapper>
            {/*<SName html={`<b>${post.username}</b>` + ' ' + post.title} />*/}
            <TitleName>{post.username}</TitleName>
            <PostContent
              type={post.type}
              content={post.content}
              onLinkPress={onLinkPress}
            />

            {/*{files.smallImages.length > 0 && (*/}
            {/*  <SImageScrollView horizontal={true}>*/}
            {/*    {files.smallImages.map((image, index) => (*/}
            {/*      <TouchableOpacity*/}
            {/*        key={image}*/}
            {/*        onPress={() => {*/}
            {/*          setInitialViewPagerIndex(index);*/}
            {/*          setPhotoViewOn();*/}
            {/*        }}>*/}
            {/*        <SImage source={{uri: image}} resizeMode={'cover'} />*/}
            {/*      </TouchableOpacity>*/}
            {/*    ))}*/}
            {/*  </SImageScrollView>*/}
            {/*)}*/}

            {/*{files.files.length > 0 && (*/}
            {/*  <>*/}
            {/*    {files.files.map(file => (*/}
            {/*      <PostFile key={file.id} file={file} />*/}
            {/*    ))}*/}
            {/*  </>*/}
            {/*)}*/}

            <SStatsWrapper>
              {/*<SActions>*/}
              {/*  {defaultReactState.loading ? (*/}
              {/*    <ActivityIndicator />*/}
              {/*  ) : (*/}
              {/*    <SStatText*/}
              {/*      onPress={!reactions.mine ? defaultReact : undefined}*/}
              {/*      color={*/}
              {/*        reactions.mine*/}
              {/*          ? Reaction.getReactionColor(reactions.mine)*/}
              {/*          : undefined*/}
              {/*      }>*/}
              {/*      {Reaction.getReactionText(*/}
              {/*        reactions.mine || ReactionEnum.LIKE,*/}
              {/*      )}*/}
              {/*    </SStatText>*/}
              {/*  )}*/}
              {/*{!hideNumberOfComment && post.stats.comments !== undefined && (*/}
              {/*  <SStatText onPress={onPressComments}>*/}
              {/*    {' '}*/}
              {/*    &middot; {'post/comments'}*/}
              {/*  </SStatText>*/}
              {/*)}*/}

              {/*</SActions>*/}
              <SStatText>
                {/*&middot; <TimeAgo time={post.since} />*/}
                <TimeAgo time={post.since} />
              </SStatText>

              {reactions.total > 0 && (
                <TouchableWithoutFeedback onPress={setReactionsModalOn}>
                  <SReactions>
                    {/* render reactions */}
                    {reactions.reactions.map(r => (
                      <SReactionImage
                        key={r}
                        source={Reaction.getReactionImage(r)}
                      />
                    ))}

                    <SLikeCountText>{reactions.total}</SLikeCountText>
                  </SReactions>
                </TouchableWithoutFeedback>
              )}

              {post?.star && post?.star_fill ? (
                <SReactions>
                  {post.star_fill.map((r: any) => {
                    return <SReactionImage key={r} source={IC_STAR_FILL} />;
                  })}

                  {post.star.map((r: any) => {
                    return <SReactionImage key={r} source={IC_STAR} />;
                  })}
                </SReactions>
              ) : (
                ''
              )}
            </SStatsWrapper>
          </SContentWrapper>

          {/*<ProfileModal*/}
          {/*  isVisible={isModalVisible}*/}
          {/*  userId={post.user_id}*/}
          {/*  onCloseRequest={setModalClose}*/}
          {/*/>*/}

          {/*{!!files.originImages.length && (*/}
          {/*  <PhotoViewModal*/}
          {/*    images={files.originImages}*/}
          {/*    isVisible={isPhotoViewVisible}*/}
          {/*    onCloseRequest={setPhotoViewOff}*/}
          {/*    initialIndex={initialViewPagerIndex}*/}
          {/*  />*/}
          {/*)}*/}

          {/*<PostActionsSheet*/}
          {/*  isVisible={isPostActionsSheetVisible}*/}
          {/*  post={post}*/}
          {/*  onCloseRequest={setActionsSheetVisibleOff}*/}
          {/*  deletePostFn={deletePostFn}*/}
          {/*  editPostFn={editPostFn}*/}
          {/*  reactPostFn={reactFn}*/}
          {/*/>*/}

          <ReactedMembersModal
            isVisible={isReactionsModalVisible}
            onCloseRequest={setReactionsModalOff}
            reactions={post.reactions}
          />
        </SWrapper>
      </TouchableOpacity>
    );
  },
);

Post.displayName = 'Post';

export default Post;
