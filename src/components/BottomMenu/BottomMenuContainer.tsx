import React, {memo, PropsWithChildren} from 'react';
import styled from 'styled-components/native';
import {Animated, StyleSheet, ViewStyle} from 'react-native';
import {screenLongDimension, screenShortDimension} from '@/utils/scale';
import {getStatusBarHeight, getBottomSpace} from 'react-native-iphone-x-helper';
import {useDeviceOrientation} from '@react-native-community/hooks';
import {Colors} from '@/themes/Colors';

interface OwnProps {
  containerStyle?: ViewStyle;
  fullScreen?: boolean;
}

type Props = OwnProps;

const Container = styled.View`
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  width: 100%;
  overflow: hidden;
  background-color: ${Colors.white};
  padding-bottom: ${15 + getBottomSpace() / 2}px;
`;

const ContainerAnimated = Animated.createAnimatedComponent(Container);

export const BottomMenuContainer = memo(
  ({children, containerStyle, fullScreen}: PropsWithChildren<Props>) => {
    const orientation = useDeviceOrientation();
    return (
      <ContainerAnimated
        style={[
          orientation.portrait ? styles.portrait : styles.landscape,
          fullScreen ? styles.fullScreen : {},
          containerStyle,
        ]}>
        {children}
      </ContainerAnimated>
    );
  },
);

const styles = StyleSheet.create({
  portrait: {
    width: '100%',
    maxHeight: screenLongDimension - getStatusBarHeight(true) - 44,
  },
  landscape: {
    width: '100%',
    maxHeight: screenShortDimension,
  },
  fullScreen: {
    width: '100%',
    height: '100%',
    maxHeight: '100%',
  },
});
