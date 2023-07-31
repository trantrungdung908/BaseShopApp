import React from 'react';
import {Header, HeaderProps} from './CommonHeader';
import {Platform, StyleSheet, ViewStyle} from 'react-native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import styled from 'styled-components/native';

interface ModalHeaderProps extends HeaderProps {
  containerStyle?: ViewStyle;
  backgroundColor?: string;
}

const headerHeight = 48;

const SHeader = styled(Header).attrs(props => ({
  containerStyle: {
    backgroundColor: props.theme.backgroundHeader,
  },
}))``;
export const ModalHeader = React.memo((props: ModalHeaderProps) => {
  const {...restProps} = props;
  const height =
    Platform.OS === 'android'
      ? headerHeight
      : headerHeight + getStatusBarHeight(true);

  const paddingTop = Platform.OS === 'android' ? 0 : getStatusBarHeight(true);
  return (
    <SHeader
      {...restProps}
      backgroundColor={props.backgroundColor}
      containerStyle={[
        props.containerStyle ? props.containerStyle : {},
        {
          height,
          paddingTop,
          paddingHorizontal: 0,
        },
      ]}
      centerContainerStyle={styles.centerContainerStyle}
    />
  );
});

const styles = StyleSheet.create({
  centerContainerStyle: {
    paddingHorizontal: 0,
  },
});
