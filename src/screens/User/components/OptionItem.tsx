import React, {memo} from 'react';
import {ImageSourcePropType} from 'react-native';
import {styled} from '@/global';
import {Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {IC_ARROW_RIGHT} from '@/assets';

export interface OptionItemInterface {
  icon: ImageSourcePropType;
  title: string;
  onSelected?: () => void;
}

export const OptionItem = memo(function ({
  icon,
  title,
  onSelected,
}: OptionItemInterface) {
  return (
    <Container onPress={onSelected}>
      <SubContainer>
        <Icon source={icon} />
        <Title>{title}</Title>
      </SubContainer>
      <SArrow source={IC_ARROW_RIGHT} />
    </Container>
  );
});

const SArrow = styled.Image`
  width: 20px;
  height: 20px;
`;

const SubContainer = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  margin: 12px 0px;
  align-items: center;
  justify-content: space-between;
`;

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;

const Title = styled(Regular)`
  font-size: 16px;
  color: ${Colors.gray1};
  margin-left: 20px;
`;
