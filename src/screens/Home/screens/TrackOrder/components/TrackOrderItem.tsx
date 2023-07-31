import React, {memo, useMemo} from 'react';
import {styled} from '@/global';
import {Bold, Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {useOrder} from '@/store/order';
import moment from 'moment';
import FastImage from 'react-native-fast-image';
import {noAvatarUri} from '@/components/Avatar';
import {scale} from '@/utils/scale';

interface TrackInterface {
  id: string;
  index?: number;
  onPress?: () => void;
}

export const TrackOrderItem = memo(function TrackOrderItem({
  onPress,
  id,
}: TrackInterface) {
  const trackOrder = useOrder(id);

  const titleTotalProduct = useMemo(() => {
    if (trackOrder) {
      return trackOrder.line_items.reduce(
        (sum: number, item: {quantity: number}) => sum + item.quantity,
        0,
      );
    }
    return 0;
  }, [trackOrder]);

  const titleTotal = useMemo(() => {
    if (trackOrder) {
      return trackOrder.line_items.reduce(
        (sum: number, item: {total: string}) => sum + parseInt(item.total),
        0,
      );
    }
    return 0;
  }, [trackOrder]);

  if (!trackOrder) {
    return null;
  }

  return (
    <STouchOrder onPress={onPress} key={id}>
      <ContainerHeader>
        <TitleId>#{trackOrder.id}</TitleId>
        <SText>
          {moment(trackOrder.date_created).format('MMM Do YY, h:mm:ss')}
        </SText>
      </ContainerHeader>
      <Container>
        <ContainerContent>
          <SImage
            source={{uri: trackOrder.line_items[0]?.image?.src || noAvatarUri}}
          />
          <Content>
            <SText>
              {trackOrder.line_items[0]?.name || 'Không có dữ liệu'}
            </SText>
            <TitleCurrency>
              {trackOrder.line_items[0]?.price.toLocaleString('en', {
                maximumSignificantDigits: 3,
              }) || '0'}
              đ
            </TitleCurrency>
          </Content>
        </ContainerContent>
        <SText>
          {trackOrder.line_items.length > 0
            ? 'x' + trackOrder.line_items[0]?.quantity
            : 'x0'}
        </SText>
      </Container>
      <ContainerFooter>
        <SText>{titleTotalProduct + ' sản phẩm'}</SText>
        <SText>{'Tổng tiền: ' + titleTotal}đ</SText>
      </ContainerFooter>
    </STouchOrder>
  );
});

const ContainerFooter = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 16px;
`;

const SImage = styled(FastImage)`
  width: 85px;
  height: 85px;
  border-radius: 10px;
  border-width: 1px;
  border-color: ${Colors.gray3};
`;

const Container = styled.View`
  padding: 16px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray7};
`;

const SText = styled(Regular)`
  font-size: 16px;
  color: ${Colors.gray1};
`;

const ContainerContent = styled.View`
  flex-direction: row;
  max-width: ${scale(280)}px;
`;

const Content = styled.View`
  margin-top: 4px;
  margin-left: 16px;
`;

const TitleCurrency = styled(Bold)`
  font-size: 14px;
  color: ${Colors.orange1};
  margin-top: 4px;
`;

const STouchOrder = styled.TouchableOpacity`
  background-color: ${Colors.white};
  border-radius: 6px;
  margin-bottom: 8px;
`;

const ContainerHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;
  padding: 12px 16px;
  border-bottom-color: ${Colors.gray7};
  align-items: center;
`;

const TitleId = styled(Medium)`
  font-size: 16px;
  color: ${Colors.gray1};
`;
