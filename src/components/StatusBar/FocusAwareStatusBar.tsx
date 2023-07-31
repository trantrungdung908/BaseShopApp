import React, {memo} from 'react';
import {useIsFocused} from '@react-navigation/native';
import {StatusBar, StatusBarProps} from 'react-native';

export const FocusAwareStatusBar = memo((props: StatusBarProps) => {
  const isFocused = useIsFocused();
  return isFocused ? <StatusBar {...props} /> : null;
});
