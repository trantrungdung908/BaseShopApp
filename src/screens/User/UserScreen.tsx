import React, {memo, useCallback} from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {Icon} from '@/components/Views/Icon';
import {
  IC_DELETE_USER,
  IC_EDIT,
  IC_HEART,
  IC_LOCATION,
  IC_LOCK,
  IC_LOGOUT,
  IC_MENU,
  IC_REVIEW_STAR,
} from '@/assets';
import {UserAvatarAndTitle} from '@/components/Avatar';
import {styled} from '@/global';
import {
  OptionItem,
  OptionItemInterface,
} from '@/screens/User/components/OptionItem';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {
  navigateToChangePassword,
  navigateToDeleteUser,
  navigateToEditInfo,
  navigateToModalAddress,
  navigateToTrackOrderScreen,
  navigateToYourPostsScreen,
} from '@/utils/navigation';
import AlertWithCustom from '@/components/Modals/AlertWithCustom';
import useBoolean from '@/hooks/useBoolean';
import {reset} from '@/store/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserScreen = memo(function () {
  const [visible, show, hide] = useBoolean(false);
  const onEdit = useCallback(() => {
    navigateToEditInfo();
  }, []);

  const handleLogout = useCallback(() => {
    reset();
    AsyncStorage.clear().then();
  }, []);

  const OptionItems: OptionItemInterface[] = [
    {
      icon: IC_MENU,
      title: 'Đơn hàng',
      onSelected: () => navigateToTrackOrderScreen(),
    },
    {
      icon: IC_REVIEW_STAR,
      title: 'Đánh giá',
      onSelected: () => navigateToYourPostsScreen(),
    },
    {
      icon: IC_LOCATION,
      title: 'Địa chỉ của bạn',
      onSelected: () => navigateToModalAddress(),
    },
    {
      icon: IC_HEART,
      title: 'Sản phẩm quan tâm',
      onSelected: () => {},
    },
    {
      icon: IC_LOCK,
      title: 'Đổi mật khẩu',
      onSelected: () => navigateToChangePassword(),
    },
    {
      icon: IC_DELETE_USER,
      title: 'Yêu cầu huỷ tài khoản',
      onSelected: () => navigateToDeleteUser(),
    },
    {
      icon: IC_LOGOUT,
      title: 'Đăng xuất',
      onSelected: () => show(),
    },
  ];

  return (
    <ScreenWrapper>
      <DynamicHeader title={''} hideGoBack={true}>
        <STouch onPress={onEdit}>
          <Icon source={IC_EDIT} />
        </STouch>
      </DynamicHeader>
      <Container>
        <UserAvatarAndTitle size={80} />
        {OptionItems.map((item, index) => {
          return (
            <OptionItem
              icon={item.icon}
              title={item.title}
              key={index}
              onSelected={item.onSelected}
            />
          );
        })}
      </Container>
      <AlertWithCustom
        name={'Thông báo'}
        visible={visible}
        hide={hide}
        title={'Bạn có muốn đăng xuất không?'}
        onPress={() => {}}
        onPressCancel={handleLogout}
      />
    </ScreenWrapper>
  );
});

const STouch = styled.TouchableOpacity`
  margin-right: 12px;
`;

const Container = styled.ScrollView`
  margin: 0px 16px;
  margin-bottom: ${getBottomSpace() + 32}px;
`;
