import {Medium, Regular} from '@/components/CommonStyled';
import ScreenWrapper from '@/components/ScreenWrapper';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import React, {memo} from 'react';
import styled from 'styled-components/native';
import {usePayment} from '@/store/payment';
import {IC_WALLET} from '@/assets';
import {Image} from 'react-native';

interface MethodItemInterface {
  id: string;
  index: number;
  onPress: () => void;
}

export const MethodItem = memo(function MethodItem({
  id,
  onPress,
}: MethodItemInterface) {
  const payment = usePayment(id);
  if (!payment) {
    return null;
  }
  return (
    <ScreenWrapper>
      <Line />
      <STouch onPress={onPress} key={id}>
        <ViewInfo>
          <Image source={IC_WALLET} />
          <TextTitle>{payment.title}</TextTitle>
        </ViewInfo>
        <TextDesc>{payment.description}</TextDesc>
      </STouch>
    </ScreenWrapper>
  );
});

const STouch = styled.TouchableOpacity`
  padding: 10px 16px;
  margin-top: 2px;
`;

const ViewInfo = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const TextTitle = styled(Medium)`
  font-size: 16px;
  color: ${Colors.gray1};
  margin-left: 12px;
`;

const TextDesc = styled(Regular)`
  font-size: 16px;
  line-height: ${scale(20)}px;
  color: ${Colors.gray4};
  margin-top: 8px;
`;
const Line = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray7};
`;
