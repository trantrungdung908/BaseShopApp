import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {SearchBar} from '@/components/SearchBar';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import ScrollTabBar, {TYPE_TAB} from '../../components/ScrollTabBar';
import PagerView from 'react-native-pager-view';
import {RawPostInterface, ReactionEnum} from '@/components/Post/types';
import {Posts} from '@/components/Post';
import {IC_PLUS, IMG_AVATAR} from '@/assets';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import ScreenWrapper, {ScreenScrollWrapper} from '@/components/ScreenWrapper';

export const ForumScreen = memo(function ForumScreen() {
  const Post: RawPostInterface[] = [
    {
      hid: '1',
      gid: 1,
      metatype: 'system',
      title: 'hello',
      type: 'post',
      content:
        'Quần bò style trẻ trung xanh và trắng dự sẽ là mẫu váy hot hit của năm nha.. Chất liệu đũi mềm mát, kiểu dáng basic siêu đỉnh luôn ạ... Thêm',
      liked: 1,
      token: '3232323',
      gavatar: IMG_AVATAR,
      attachment: null,
      username: 'Nguyễn Minh Quang',
      user_id: '1',
      id: '1',
      since: 1,
      reactions: [{reaction: ReactionEnum.LIKE}],
    },
    {
      hid: '1',
      gid: 1,
      metatype: 'system',
      title: 'hello',
      type: 'post',
      content:
        'Quần bò style trẻ trung xanh và trắng dự sẽ là mẫu váy hot hit của năm nha.. Chất liệu đũi mềm mát, kiểu dáng basic siêu đỉnh luôn ạ... Thêm',
      liked: 1,
      token: '3232323',
      gavatar: IMG_AVATAR,
      attachment: null,
      username: 'Nguyễn Minh Quang',
      user_id: '1',
      id: '1',
      since: 1,
      reactions: [{reaction: ReactionEnum.HAHA}],
    },
    {
      hid: '1',
      gid: 1,
      metatype: 'system',
      title: 'hello',
      type: 'post',
      content:
        'Quần bò style trẻ trung xanh và trắng dự sẽ là mẫu váy hot hit của năm nha.. Chất liệu đũi mềm mát, kiểu dáng basic siêu đỉnh luôn ạ... Thêm',
      liked: 3,
      token: '3232323',
      gavatar: IMG_AVATAR,
      attachment: null,
      username: 'Nguyễn Minh Quang',
      user_id: '1',
      id: '1',
      since: 1,
      reactions: [{reaction: ReactionEnum.SAD}],
    },
    {
      hid: '1',
      gid: 1,
      metatype: 'system',
      title: 'hello',
      type: 'post',
      content:
        'Quần bò style trẻ trung xanh và trắng dự sẽ là mẫu váy hot hit của năm nha.. Chất liệu đũi mềm mát, kiểu dáng basic siêu đỉnh luôn ạ... Thêm',
      liked: 10,
      token: '3232323',
      gavatar: IMG_AVATAR,
      attachment: null,
      username: 'Nguyễn Minh Quang',
      user_id: '1',
      id: '1',
      since: 1,
      reactions: [{reaction: ReactionEnum.CARE}],
    },
  ];
  const pagerViewRef = React.useRef<PagerView>();

  const onChangeTab = useCallback((value: TYPE_TAB) => {
    if (value === TYPE_TAB.TAT_CA) {
      pagerViewRef.current?.setPage(0);
      return;
    } else if (value === TYPE_TAB.BAN_HANG) {
      pagerViewRef.current?.setPage(1);
      return;
    } else if (value === TYPE_TAB.KINH_NGHIEM_MUA_HANG) {
      pagerViewRef.current?.setPage(2);
      return;
    } else {
      pagerViewRef.current?.setPage(3);
      return;
    }
  }, []);

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Cộng đồng'} />
      <WrapSearch>
        <SearchBar placeholder="Tìm kiếm bài đăng" />
      </WrapSearch>
      <ContainerTags>
        <ScrollTabBar onChangeTab={onChangeTab} />
      </ContainerTags>
      <ScreenScrollWrapper>
        <Posts
          posts={Post}
          loadPostsFn={() => {}}
          loadMoreFn={() => {}}
          postReactionFn={() => {}}
          deletePostFn={() => {}}
          editPostFn={() => {}}
        />
      </ScreenScrollWrapper>
      <STouchPlus>
        <SImagePlus source={IC_PLUS} />
      </STouchPlus>
    </ScreenWrapper>
  );
});

const ContainerTags = styled.View`
  margin: 2px 0;
  background-color: ${Colors.white};
  height: 40px;
`;
const WrapSearch = styled.View`
  height: ${scale(50)}px;
  padding: 6px 16px;
  background-color: ${Colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray7};
`;

const STouchPlus = styled.TouchableOpacity`
  width: 54px;
  height: 54px;
  background-color: ${Colors.brown};
  border-radius: 54px;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 21px;
  right: 15px;
`;
const SImagePlus = styled.Image`
  tint-color: ${Colors.white};
  width: 32px;
  height: 32px;
`;
export default ForumScreen;
