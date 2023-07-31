import React, {memo} from 'react';
import {Platform} from 'react-native';
import {styled} from '@/global';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import DeviceInfo from 'react-native-device-info';
import {fScale, screenShortDimension} from '@/utils/scale';

const HEIGHT_IN_PORTRAIT = DeviceInfo.isTablet()
  ? fScale(100)
  : screenShortDimension <= 320
  ? 23
  : 53;

const Spacer = styled.View<{landscape: boolean}>`
  height: ${() =>
    HEIGHT_IN_PORTRAIT +
    (Platform.OS === 'ios' ? getStatusBarHeight(true) : 0)}px;
  width: 100%;
`;

export const LogoSpacer = memo(function LogoSpacer() {
  const orientation = useDeviceOrientation();
  return <Spacer landscape={orientation.landscape} />;
});
