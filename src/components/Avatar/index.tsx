import {styled} from '@/global';
import React, {memo, useCallback, useMemo} from 'react';
import {
  ImageProps,
  ImageSourcePropType,
  ImageURISource,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {SvgUri} from 'react-native-svg';
import getStore from '@/store/getStore';
import FastImage from 'react-native-fast-image';
import {Colors} from '@/themes';
import {ImageSizeEnum} from './types';
import ImageHelper from './ImageHelper';
import {getInfo} from '@/store/user';
import useAutoToastError from '@/hooks/useAutoToastError';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {LoadingView} from '@/components/Views/LoadingView';
import {Regular} from '@/components/CommonStyled';
import {IMG_AVATAR} from '@/assets';

export const AvatarImage = styled(FastImage)<{size: number}>`
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  border-radius: ${p => (p.size || 120) / 2}px;
  border-width: 0.5px;
  border-color: ${Colors.gray3};
`;

export interface AvatarProps extends Omit<ImageProps, 'source'> {
  size: number;
  uriSize?: ImageSizeEnum;
}

export const noAvatarUri = 'https://data-gcdn.basecdn.net/noavatar.png';
export const MyProfileAvatar = memo(function MyProfileAvatar({
  size,
  onPressViewAvatar,
  ...props
}: AvatarProps & {
  onPressViewAvatar?: boolean;
}) {
  const AvatarElement$ = <UserAvatar size={size} {...props} />;

  const values = useMemo(() => {
    return {
      onPress: () => {
        const user = getStore().getState().user.info || {};
        // openFileViewer({
        //   name: profile?.name || user?.name || '',
        //   url: user?.gavatar,
        // });
      },
    };
  }, []);

  if (onPressViewAvatar) {
    return (
      <TouchableOpacity onPress={values.onPress}>
        {AvatarElement$}
      </TouchableOpacity>
    );
  }

  return AvatarElement$;
});

interface SvgImageProps {
  uri: string;
  size: number | string;
}

export const SvgImage = memo((props: SvgImageProps) => {
  const {size, uri} = props;
  return <SvgUri width={size} height={size} uri={uri} />;
});

export interface UserAvatarProps extends AvatarProps {
  onCallBack?: (value: string) => void;
  isLoading?: boolean;
}

export const UserAvatar = memo(function ({uriSize, ...props}: UserAvatarProps) {
  const user = getInfo();
  const isImgLink = useCallback((url: string) => {
    if (typeof url !== 'string') {
      return false;
    }
    return (
      url.match(/^http[^\?]*.(jpg|jpeg|gif|png|tiff|bmp)(\?(.*))?$/gim) != null
    );
  }, []);

  const avatarImageSource: ImageURISource = useMemo(() => {
    if (!user.avatar_url || !isImgLink(user.avatar_url)) {
      return user.avatar_url;
    }

    return {
      uri: ImageHelper(user.avatar_url).getImageSize(
        uriSize || ImageSizeEnum.SIZE_2,
      ),
    };
  }, [user.avatar_url, isImgLink, uriSize]);

  const navigateUser = useCallback(() => {}, []);

  return (
    <TouchableWithoutFeedback onPress={navigateUser}>
      <AvatarImage
        //@ts-ignore
        source={avatarImageSource}
        {...props}
      />
    </TouchableWithoutFeedback>
  );
});

export const UserAvatarAndTitle = memo(function ({
  onCallBack,
  isLoading,
  ...props
}: UserAvatarProps) {
  const user = getInfo();

  const avatarImageSource: ImageURISource = useMemo(() => {
    if (!user || !user.avatar_url) {
      return {uri: noAvatarUri};
    }
    return {uri: user.avatar_url};
  }, [user]);

  const [{loading, error}, onChangeAvatar] = useAsyncFn(async () => {
    // const file = await File.pickImage({
    //   multiple: false,
    //   onPermissionLimited: () => openSettings(),
    // });
  }, []);

  useAutoToastError(error);
  return (
    <SWrapper>
      <STouch onPress={onChangeAvatar}>
        <AvatarImageWrapper>
          {loading || isLoading ? (
            <LoadingView />
          ) : (
            <AvatarImage
              //@ts-ignore
              source={avatarImageSource}
              {...props}
              resizeMode={'stretch'}
            />
          )}
        </AvatarImageWrapper>
      </STouch>
      <SViewWrapName>
        <SName>{user?.username}</SName>
      </SViewWrapName>
      <SWrapNP>
        <TitleNumberPhone>{user?.phone}</TitleNumberPhone>
      </SWrapNP>
    </SWrapper>
  );
});

const buildImageStyle = (size: number) => {
  const radius = size / 2;
  const imageStyle: any = {
    width: size,
    height: size,
    borderRadius: radius,
    overflow: 'hidden',
    backgroundColor: '#E0E0E0',
  };
  return imageStyle;
};

interface Props {
  avatar: ImageSourcePropType;
  size: 16 | 20 | 24 | 28 | 32 | 36 | 40;
}

const Avatar = memo(({avatar, size = 28}: Props) => {
  const gavatarUri = useMemo(
    () => (avatar ? avatar : 'https://data-gcdn.basecdn.net/noavatar.png'),
    [avatar],
  );

  const imageStyle = useMemo(() => buildImageStyle(size), [size]);
  return (
    <View>
      <FastImage style={imageStyle} source={IMG_AVATAR} />
    </View>
  );
});

export default Avatar;

const SWrapNP = styled.View`
  margin-top: 8px;
`;

const STouch = styled.TouchableOpacity``;

const TitleNumberPhone = styled(Regular)`
  color: ${Colors.gray3};
  font-size: 16px;
`;

const SName = styled.Text`
  color: ${Colors.gray1};
  font-size: 18px;
  margin-bottom: 8px;
`;

const SWrapper = styled.View`
  flex-direction: column;
  margin: 16px 0px;
  align-items: center;
`;

const SViewWrapName = styled.View`
  margin: 16px 0 0 0;
  justify-content: center;
`;

const FloatIconWrapper = styled.View`
  position: absolute;
  right: -4px;
  top: 9px;
  width: 30px;
  height: 30px;
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

const FloatIcon = styled(FastImage)`
  width: 10px;
  height: 8px;
  tint-color: ${Colors.white};
`;

const AvatarImageWrapper = styled.View<{size?: number}>`
  width: ${p => p.size || 80}px;
  height: ${p => p.size || 80}px;
  border-color: ${Colors.gray3};
  overflow: hidden;
`;
