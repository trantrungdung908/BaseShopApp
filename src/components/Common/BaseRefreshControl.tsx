import React, {memo} from 'react';
import {RefreshControl, RefreshControlProps} from 'react-native';

interface Props extends Omit<RefreshControlProps, 'tintColor'> {
  tintColorDark?: string;
  tintColorLight?: string;
}
export const BaseRefreshControl = memo(({...props}: Props) => {
  return <RefreshControl {...props} />;
});
