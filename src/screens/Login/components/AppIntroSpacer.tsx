import React, {memo} from 'react';
import {styled} from '@/global';
import {useDeviceOrientation} from '@react-native-community/hooks';
import DeviceInfo from 'react-native-device-info';
import {fScale} from '@/utils/scale';

const HEIGHT_IN_PORTRAIT = DeviceInfo.isTablet() ? fScale(50) : 39;

const Spacer = styled.View<{landscape: boolean}>`
  height: ${() => HEIGHT_IN_PORTRAIT}px;
  width: 100%;
`;

export const AppIntroSpacer = memo(function AppIntroSpacer() {
  const orientation = useDeviceOrientation();
  return <Spacer landscape={orientation.landscape} />;
});
