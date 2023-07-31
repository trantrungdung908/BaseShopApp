import React, {memo} from 'react';
import {styled} from '@/global';
import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {IC_HEART_V2} from '@/assets';

export interface TopicItemInterface {
  name: string;
  title: string;
  onPress?: () => void;
  value?: boolean;
}

export const TopicItem = memo(function ({
  name,
  title,
  onPress,
  value = true,
}: TopicItemInterface) {
  return (
    <Container onPress={onPress}>
      <ContainerHeader>
        <Icon source={IC_HEART_V2} />
        <TitleName>{name}</TitleName>
      </ContainerHeader>
      <Title>{title}</Title>
    </Container>
  );
});

const Icon = styled.Image`
  width: 24px;
  height: 24px;
`;

const Title = styled(Regular)`
  font-size: 14px;
  color: ${Colors.gray2};
  margin-top: 12px;
`;

const ContainerHeader = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Container = styled.TouchableOpacity`
  border-radius: 16px;
  background-color: ${Colors.white};
  padding: 16px;
  margin-bottom: 16px;
`;

const TitleName = styled(Medium)`
  font-size: 16px;
  margin-left: 12px;
`;
