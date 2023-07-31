import React, {memo} from 'react';
import {styled} from '@/global';
import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {ScrollView, View} from 'react-native';

interface NotifItemInterface {
  item: any;
  onSelected?: () => void;
}

export const NotifItem = memo(function ({item}: NotifItemInterface) {
  return (
    <Container>
      <ViewWrap>
        <SImage>
          <Icon source={item.icon} />
        </SImage>
        <SubContainer>
          <Title>{item.title}</Title>
          <TitleDate>{item.date}</TitleDate>
        </SubContainer>
      </ViewWrap>
    </Container>
  );
});

const ViewWrap = styled.View`
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray6};
  margin: 0px 15px;
  padding: 16px 0;
  flex-direction: row;
`;
const SubContainer = styled.View`
  margin-left: 16px;
  width: 80%;
`;

const Container = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const Icon = styled.Image`
  tint-color: ${Colors.orange1};
  padding: 6px;
`;

const Title = styled(Medium)`
  font-size: 16px;
  line-height: 22px;
  color: ${Colors.gray1};
`;
const TitleDate = styled(Title)`
  color: ${Colors.gray12};
  font-size: 14px;
  margin-top: 8px;
`;
const SImage = styled.View`
  width: 32px;
  height: 32px;
  background-color: ${Colors.colorYellow};
  justify-content: center;
  align-items: center;
  border-radius: 32px;
`;
