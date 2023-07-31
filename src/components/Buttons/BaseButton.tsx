import React, {useMemo} from 'react';
import {
  Platform,
  TouchableHighlight,
  TouchableNativeFeedback,
  TouchableNativeFeedbackProps,
  View,
  TouchableOpacity,
  TouchableHighlightProps,
  TouchableOpacityProps,
  StyleSheet,
} from 'react-native';
import {Colors} from '@/themes/Colors';
import styled from 'styled-components/native';
export type BaseButtonProps = TouchableHighlightProps &
  TouchableNativeFeedbackProps;

interface IBaseButtonProps extends BaseButtonProps {
  onPress?:
    | TouchableHighlightProps['onPress']
    | TouchableNativeFeedbackProps['onPress'];
  children: any;
}

export function BaseButton(props: IBaseButtonProps) {
  const {style, onPress, children, ...restProps} = props;

  const onPressWithFrame = React.useCallback(
    event => {
      requestAnimationFrame(() => {
        onPress && onPress(event);
      });
    },
    [onPress],
  );

  // for iOS only
  const touchableStyle = useMemo(() => {
    const flattenStyle = StyleSheet.flatten(style);
    return {
      width: flattenStyle?.width,
      height: flattenStyle?.height,
      flex: flattenStyle?.flex,
      flexGrow: flattenStyle?.flexGrow,
      flexShrink: flattenStyle?.flexShrink,
      flexBasis: flattenStyle?.flexBasis,
      marginTop: flattenStyle?.marginTop,
      marginRight: flattenStyle?.marginRight,
      marginBottom: flattenStyle?.marginBottom,
      marginLeft: flattenStyle?.marginLeft,
      marginHorizontal: flattenStyle?.marginHorizontal,
      marginVertical: flattenStyle?.marginVertical,
    };
  }, [style]);

  const viewStyle = useMemo(() => {
    const flattenStyle = StyleSheet.flatten(style || {});
    const {
      width,
      height,
      marginHorizontal,
      marginVertical,
      marginTop,
      marginBottom,
      marginLeft,
      marginRight,
      ...newStyle
    } = flattenStyle;

    return StyleSheet.flatten([
      newStyle,
      {
        width: '100%',
        flex: 1,
      },
    ]);
  }, [style]);

  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback {...restProps} onPress={onPressWithFrame}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableHighlight
      underlayColor={Colors.primary + 10}
      {...restProps}
      style={touchableStyle}
      onPress={onPressWithFrame}>
      <View style={viewStyle}>{children}</View>
    </TouchableHighlight>
  );
}

export type BaseButtonOpacityProps = TouchableOpacityProps &
  TouchableNativeFeedbackProps;

interface IBaseButtonOpacityProps extends BaseButtonOpacityProps {
  onPress?:
    | TouchableOpacityProps['onPress']
    | TouchableNativeFeedbackProps['onPress'];
  children: any;
}

export function BaseOpacityButton(props: IBaseButtonOpacityProps) {
  const {style, onPress, children, ...restProps} = props;
  const onPressWithFrame = React.useCallback(
    event => {
      requestAnimationFrame(() => {
        onPress && onPress(event);
      });
    },
    [onPress],
  );
  if (Platform.OS === 'android') {
    return (
      <TouchableNativeFeedback {...restProps} onPress={onPressWithFrame}>
        <View style={style}>{children}</View>
      </TouchableNativeFeedback>
    );
  }

  return (
    <TouchableOpacity {...restProps} style={style} onPress={onPressWithFrame}>
      {children}
    </TouchableOpacity>
  );
}

export const SBaseButton = styled(BaseButton).attrs(props => ({
  underlayColor: Colors.red1,
}))``;

export default SBaseButton;