import ScreenWrapper from '@/components/ScreenWrapper';
import React, {memo} from 'react';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {IMG_NOT_NETWORK} from '@/assets';
import {styled} from '@/global';
import {Bold, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';

export const OfflineScreen = memo(function () {
  return (
    <ScreenWrapper>
      <DynamicHeader title={''} hideGoBack={true} />
      <SImage source={IMG_NOT_NETWORK} />
      <STitle>Bạn đang ngoại tuyến</STitle>
      <SText>
        Kết nối với mạng hoặc máy chủ bị lỗi. Bạn vui lòng kiểm tra lại kết nối
        mạng.
      </SText>
    </ScreenWrapper>
  );
});

const SImage = styled.Image`
  margin: 0 auto;
`;
const STitle = styled(Bold)`
  text-align: center;
  font-size: 18px;
  color: ${Colors.gray1};
  margin-bottom: 12px;
`;
const SText = styled(Regular)`
  text-align: center;
  font-size: 16px;
  margin: 0 20px;
  color: ${Colors.gray1};
`;
