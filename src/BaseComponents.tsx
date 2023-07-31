import {styled} from '@/global';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  TextStyle,
  View,
  ViewStyle,
  Text,
  TouchableOpacityProps,
  TouchableOpacity,
  TextProps,
} from 'react-native';
import React, {PropsWithChildren} from 'react';

export const Bold = styled.Text``;

export const CssView = ({children, ...props}: PropsWithChildren<ViewStyle>) => {
  return <View style={props}>{children}</View>;
};

export const CssImage = ({
  source,
  ...props
}: ImageStyle & {source: ImageSourcePropType}) => {
  return <Image source={source} style={props} />;
};

export const CssText = ({
  children,
  numberOfLines,
  ...props
}: PropsWithChildren<TextStyle> & {
  numberOfLines?: TextProps['numberOfLines'];
}) => {
  return (
    <Text numberOfLines={numberOfLines} style={props}>
      {children}
    </Text>
  );
};

export const CssTouchableOpacity = ({
  children,
  onPress,
  onLongPress,
  ...props
}: PropsWithChildren<TouchableOpacityProps['style']> & {
  onPress?: TouchableOpacityProps['onPress'];
  onLongPress?: TouchableOpacityProps['onLongPress'];
}) => {
  return (
    <TouchableOpacity onPress={onPress} onLongPress={onLongPress} style={props}>
      {children}
    </TouchableOpacity>
  );
};
