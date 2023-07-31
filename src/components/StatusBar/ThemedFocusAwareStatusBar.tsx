import React, {memo} from 'react';
import {StatusBarProps, StatusBarStyle} from 'react-native';
import {useTheme} from '@/global';
import {FocusAwareStatusBar} from './FocusAwareStatusBar';
import {ThemeNameEnum} from '@/screens/Setting/types';

interface Props extends Omit<StatusBarProps, 'barStyle' | 'backgroundColor'> {
  lightBarStyle?: StatusBarStyle;
  lightBackgroundColor?: string;
  darkBarStyle?: StatusBarStyle;
  darkBackgroundColor?: string;
}
export const ThemedFocusAwareStatusBar = memo(
  function ThemedFocusAwareStatusBar({
    lightBarStyle,
    lightBackgroundColor,
    darkBarStyle,
    darkBackgroundColor,
    ...restProps
  }: Props) {
    const theme = useTheme();
    return (
      <FocusAwareStatusBar
        {...restProps}
        barStyle={
          theme.name === ThemeNameEnum.dark ? darkBarStyle : lightBarStyle
        }
        backgroundColor={
          theme.name === ThemeNameEnum.dark
            ? lightBackgroundColor
            : darkBackgroundColor
        }
      />
    );
  },
);
