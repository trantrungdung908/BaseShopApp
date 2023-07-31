import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import React, {memo, useMemo} from 'react';
import styled from 'styled-components/native';
import {useCart} from '@/store/cart';

interface OrderItemInterface {
  id: number;
}

export const OrderItem = memo(function OrderItem({id}: OrderItemInterface) {
  const orderItem = useCart(id.toString());

  const cartName = useMemo(() => {
    if (orderItem) {
      if (orderItem.variation && orderItem.variation.length > 0) {
        return (
          // eslint-disable-next-line @typescript-eslint/no-shadow
          orderItem.name +
          '- ' +
          orderItem.variation.map(item => item.value).join(', ')
        );
      }
      return orderItem.name;
    }
    return '';
  }, [orderItem]);
  if (!orderItem) {
    return null;
  }
  return (
    <SViewProduct key={orderItem.key}>
      <SImage source={{uri: orderItem.images[0].src}} />
      <ContentView>
        <TextName numberOfLines={2}>{cartName}</TextName>
        <TextPrice>
          {parseInt(orderItem.prices.price).toLocaleString('en')}đ
        </TextPrice>
      </ContentView>
      <TextAmount>x{orderItem.quantity}</TextAmount>
    </SViewProduct>
  );
});

const SViewProduct = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex: 1;
  border-color: ${Colors.gray7};
  border-bottom-width: 1px;
  padding: 16px 30px;
`;

const ContentView = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const SImage = styled.Image`
  width: ${scale(80)}px;
  height: ${scale(80)}px;
  border-radius: 5px;
`;

const TextName = styled(Medium)`
  font-size: 16px;
  letter-spacing: -0.4px;
  color: ${Colors.gray1};
`;

const TextPrice = styled(Medium)`
  font-size: 16px;
  color: ${Colors.orange1};
  margin: 6px 0;
`;

const TextAmount = styled(Regular)`
  font-size: 15px;
  line-height: ${scale(22)}px;
  color: ${Colors.gray4};
`;
