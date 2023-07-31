import React from 'react';
import {
  ImageBackground,
  ImageStyle,
  ImageURISource,
  Platform,
  StatusBar,
  StatusBarProps,
  StatusBarStyle,
  StyleProp,
  StyleSheet,
  Text,
  TextProps,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import renderNode from '@/utils/renderNode';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';

const ALIGN_STYLE: any = {
  left: 'flex-start',
  right: 'flex-end',
  center: 'center',
};

export type HeaderSubComponent = React.ReactElement<{}> | TextProps;

export interface HeaderProps extends ViewProps {
  /**
   * Accepts all props for StatusBar
   */
  statusBarProps?: StatusBarProps;

  /**
   * Sets the color of the status bar text.
   *
   * @default 'default'
   */
  barStyle?: StatusBarStyle;

  /**
   * Configuration object for default component (icon: string, ...props for React Native Elements Icon) or a valid React Element	define your left component here
   */
  leftComponent?: HeaderSubComponent;

  /**
   * Configuration object for default component (text: string, ...props for React Native Text component) valid React Element	define your center component here
   */
  centerComponent?: HeaderSubComponent;

  /**
   * Configuration object for default component (icon: string, ...props for React Native Elements Icon component) or a valid React Element	define your right component here
   */
  rightComponent?: HeaderSubComponent;

  /**
   * Sets backgroundColor of the parent component
   */
  backgroundColor?: string;

  /**
   * Background image source
   */
  backgroundImage?: ImageURISource;

  /**
   * Styles for the background image in the container
   */
  backgroundImageStyle?: ImageStyle;

  /**
   * Determines the alignment of the title
   *
   * @default 'center'
   */
  placement?: 'left' | 'center' | 'right';

  /**
   * Styling for main container
   */
  containerStyle?: StyleProp<ViewStyle> | ViewStyle[];

  /**
   * Styles for the container surrounding the title
   */
  centerContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Styling for container around the leftComponent
   */
  leftContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Styling for container around the rightComponent
   */
  rightContainerStyle?: StyleProp<ViewStyle>;
  children?: any;
}

interface ChildrenProps {
  placement: 'left' | 'center' | 'right';
  style?: StyleProp<ViewStyle>;
  children?: any;
}

const Children = (props: ChildrenProps) => {
  const {style, placement, children} = props;
  return (
    <View
      style={StyleSheet.flatten([{alignItems: ALIGN_STYLE[placement]}, style])}>
      {children == null || children === false
        ? null
        : children.text
        ? renderNode(Text, children.text, {numberOfLines: 1, ...children})
        : renderNode(Text, children)}
    </View>
  );
};

// export class Header extends React.Component<HeaderProps, any> {}

export const Header = ({
  statusBarProps,
  leftComponent,
  centerComponent,
  rightComponent,
  leftContainerStyle,
  centerContainerStyle,
  rightContainerStyle,
  backgroundColor,
  backgroundImage,
  backgroundImageStyle,
  containerStyle,
  placement,
  barStyle,
  children,
  ...attributes
}: HeaderProps) => {
  return (
    <ImageBackground
      {...attributes}
      style={StyleSheet.flatten([
        styles.container,
        containerStyle,
        backgroundColor && {backgroundColor},
      ])}
      source={backgroundImage}
      imageStyle={backgroundImageStyle}>
      <StatusBar barStyle={barStyle} {...statusBarProps} />
      <Children
        style={StyleSheet.flatten([
          placement === 'center' && styles.rightLeftContainer,
          leftContainerStyle,
        ])}
        placement="left">
        {(React.isValidElement(children) && children) ||
          (children && children[0]) ||
          leftComponent}
      </Children>

      <Children
        style={StyleSheet.flatten([
          styles.centerContainer,
          placement !== 'center' && {
            paddingHorizontal: Platform.select({
              android: 16,
              default: 15,
            }),
          },
          centerContainerStyle,
        ])}
        placement={placement}>
        {(children && children[1]) || centerComponent}
      </Children>

      <Children
        style={StyleSheet.flatten([
          placement === 'center' && styles.rightLeftContainer,
          rightContainerStyle,
        ])}
        placement="right">
        {(children && children[2]) || rightComponent}
      </Children>
    </ImageBackground>
  );
};

Header.defaultProps = {
  placement: 'center',
  children: [],
};

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 0 : getStatusBarHeight(true),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: Platform.OS === 'android' ? 48 : 48 + getStatusBarHeight(true),
  },
  centerContainer: {
    flex: 3,
  },
  rightLeftContainer: {
    flex: 1,
  },
});
