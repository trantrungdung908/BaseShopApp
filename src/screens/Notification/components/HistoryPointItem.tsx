import React, {memo} from 'react';
import {styled} from '@/global';
import {Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';

interface HistoryPointItemInterface {
  item: any;
  onSelected?: () => void;
}

export const HistoryPointItem = memo(function ({
  item,
}: HistoryPointItemInterface) {
  return (
    <Container>
      <SubContainer>
        <Icon source={item.icon} />
        <Title>{item.point}</Title>
        <TitleDate>{item.date}</TitleDate>
      </SubContainer>
    </Container>
  );
});

const SubContainer = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.backgroundColor};
  flex: 1;
  padding: 12px 16px;
  border-radius: 12px;
`;

const Container = styled.TouchableOpacity`
  flex-direction: row;
  margin: 16px 15px 0px 15px;
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
  margin-left: 12px;
`;
const TitleDate = styled(Title)`
  font-size: 16px;
  color: ${Colors.gray12};
  margin-left: auto;
`;
