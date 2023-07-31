import React, {memo, ReactNode, useMemo} from 'react';
import {ScrollViewProps, StyleSheet} from 'react-native';
// @ts-ignore
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {getBottomSpace, isIphoneX} from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingBottom: isIphoneX() ? getBottomSpace() : 0,
    flexGrow: 1,
  },
});

interface ScreenScrollContainerProps extends ScrollViewProps {
  children?: ReactNode;
  innerRef?: any;
}
export const ScreenScrollContainer = memo(function ScreenScrollContainer({
  children,
  innerRef,
  ...props
}: ScreenScrollContainerProps) {
  const contentContainerStyle = useMemo(() => {
    return StyleSheet.flatten([
      styles.contentContainerStyle,
      props.contentContainerStyle,
    ]);
  }, [props.contentContainerStyle]);

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={contentContainerStyle}
      innerRef={innerRef}
      {...props}>
      {children}
    </KeyboardAwareScrollView>
  );
});

export default ScreenScrollContainer;
