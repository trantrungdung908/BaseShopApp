import React, {memo} from 'react';
import {TextStyle, TouchableOpacityProps, View} from 'react-native';
import {styled} from '@/global';
import {IC_MINUS, IC_PLUS_CART} from '@/assets';
import {Bold} from '@/components/CommonStyled';
import {Colors} from '@/themes';

export interface DynamicChangeQuantityInterface extends TouchableOpacityProps {
  onChangeValue?: (value: number) => void;
  value: number;
  styleLabel?: TextStyle;
}

export const DynamicChangeQuantity = memo(function ({
  value,
  onChangeValue,
  ...props
}: DynamicChangeQuantityInterface) {
  return (
    <Wrapper {...props}>
      <STouch onPress={() => onChangeValue?.(value - 1)} disabled={value === 1}>
        <SIcon source={IC_MINUS} />
      </STouch>
      <ContainerValue>
        <TitleValue>{value}</TitleValue>
      </ContainerValue>
      <STouch onPress={() => onChangeValue?.(value + 1)}>
        <SIcon source={IC_PLUS_CART} />
      </STouch>
    </Wrapper>
  );
});

const ContainerValue = styled.View`
  width: 32px;
  align-items: center;
  justify-content: center;
`;

const TitleValue = styled(Bold)`
  font-size: 16px;
  color: ${Colors.gray5};
  align-self: center;
`;

const Wrapper = styled(View)`
  flex-direction: row;
`;

const SIcon = styled.Image`
  width: 16px;
  height: 16px;
`;

const STouch = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  border-radius: 32px;
  border-color: ${Colors.gray3};
`;
