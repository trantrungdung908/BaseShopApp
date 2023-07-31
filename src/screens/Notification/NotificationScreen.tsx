import {DynamicHeader} from '@/components/Header/DynamicHeader';
import ScreenWrapper from '@/components/ScreenWrapper';
import React, {memo} from 'react';
import {EmptyView} from '@/components/Views/EmptyView';

export const NotificationScreen = memo(function () {
  return (
    <ScreenWrapper>
      <DynamicHeader title={'Thông báo'} hideGoBack={true} />
      <EmptyView />
    </ScreenWrapper>
  );
});
