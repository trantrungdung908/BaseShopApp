import React, {memo} from 'react';
import styled from 'styled-components/native';
import DeviceInfo from 'react-native-device-info';
import {fScale, scale, screenLongDimension} from '@/utils/scale';
import {IMG_LOGO} from '@/assets';

const size = DeviceInfo.isTablet()
  ? fScale(180)
  : screenLongDimension <= 120
  ? 180
  : 180;

const SImage = styled.Image`
  width: ${size}px;
  height: ${size}px;
  margin-top: ${scale(80)}px;
`;

export const Logo = memo(() => {
  return <SImage resizeMode="contain" source={IMG_LOGO} />;
});
