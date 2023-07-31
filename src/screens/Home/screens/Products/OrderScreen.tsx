import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes';
import {Medium, Regular} from '@/components/CommonStyled';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {
  clearStackForTrackOrderScreen,
  navigateToCouponModal,
  navigateToModalAddress,
  navigateToPaymentMethodModal,
} from '@/utils/navigation';
import {IC_ARROW_RIGHT, IC_LOCATION, IC_TICKET, IC_WALLET} from '@/assets';
import {ActivityIndicator, Image, View} from 'react-native';
import {scale} from '@/utils/scale';
import {OrderItem} from '../../components/OrderItem';
import ScreenWrapper, {ScreenScrollWrapper} from '@/components/ScreenWrapper';
import {ViewWrapper} from '@/components';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {usePayment} from '@/store/payment';
import {getInfo} from '@/store/user';
import useAsyncFn from '@/hooks/useAsyncFn';
import {requestPostOrder} from '@/store/order/functions';
import {ParamsOrderInterface} from '@/store/order';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {getAllCarts, getCartByQuery, useCartByQuery} from '@/store/cart';
import useAutoToastError from '@/hooks/useAutoToastError';

export interface OrderInterface {
  itemId: string[];
  total_price: string;
}

export const OrderScreen = memo(function OrderScreen() {
  const {itemId, total_price} = useNavigationParams<OrderInterface>();
  const [idPayment, setIdPayment] = useState<string>('');
  const carts = getAllCarts();
  const code = useCartByQuery('coupons');
  const methodPay = usePayment(idPayment);
  const total = getCartByQuery('total');
  const user = getInfo();
  const onNavigateToAddress = useCallback(() => {
    navigateToModalAddress();
  }, []);
  const onNavigateCouponModal = useCallback(() => {
    navigateToCouponModal({cartIds: itemId, total_price: total_price});
  }, [itemId, total_price]);
  const onPaymentMethod = useCallback(() => {
    navigateToPaymentMethodModal({
      onPressTitle: setIdPayment,
    });
  }, []);

  const [{error: errorOrder, loading: loadingOrder}, orderItem] =
    useAsyncFn(async () => {
      const line_items = carts.map(item => {
        if (item.variation && item.variation.length > 0) {
          return {
            product_id: item.id,
            variation_id: item.id,
            quantity: item.quantity,
          };
        }
        return {
          product_id: item.id,
          quantity: item.quantity,
        };
      });

      const paramsOrders: ParamsOrderInterface = {
        payment_method: idPayment,
        customer_id: user?.id,
        billing: user?.billing,
        shipping: user?.shipping,
        line_items: line_items,
        coupon_lines: code,
      };

      await requestPostOrder(paramsOrders);
      clearStackForTrackOrderScreen();
    }, []);

  useAutoToastError(errorOrder);

  return (
    <ScreenWrapper>
      <DynamicHeader title="Đặt hàng" />
      <Container>
        <ScreenScrollWrapper>
          <STouch onPress={onNavigateToAddress}>
            <SIcon source={IC_LOCATION} />
            <ViewInfo>
              <View>
                <TextTitle>{'Thông tin người nhận'}</TextTitle>
                <TextAddress numberOfLines={1}>
                  {user.billing?.address_1 || user.shipping?.address_1}
                </TextAddress>
                <ViewRow>
                  <TextInfo>{`${
                    user.billing?.last_name || user.shipping?.last_name
                  } ${
                    user.billing?.first_name || user.shipping?.first_name
                  }`}</TextInfo>
                  <Dive />
                  <TextInfo>
                    {user.billing?.phone || user.shipping?.phone}
                  </TextInfo>
                </ViewRow>
              </View>
              <Image source={IC_ARROW_RIGHT} />
            </ViewInfo>
          </STouch>
          <Line />
          {itemId.map(item => {
            // @ts-ignore
            return <OrderItem key={item} id={item} />;
          })}
          <ViewFlexPrice>
            <TextTitle>{'Tổng tiền hàng'}</TextTitle>
            <TextPrice>{parseInt(total_price).toLocaleString('en')}đ</TextPrice>
          </ViewFlexPrice>

          <STouch onPress={onNavigateCouponModal}>
            <SIcon source={IC_TICKET} />
            <ViewInfo>
              <View>
                <TextTitle>{'Mã khuyến mãi'}</TextTitle>
                <TextAddress>
                  {code.length > 0
                    ? `Mã giảm giá: ${code[0]?.code}`
                    : 'Chọn hoặc nhập mã khuyến mãi'}
                </TextAddress>
              </View>
              <Image source={IC_ARROW_RIGHT} />
            </ViewInfo>
          </STouch>
          <STouch onPress={onPaymentMethod}>
            <SIcon source={IC_WALLET} />
            <ViewInfo>
              <View>
                <TextTitle>{'Hình thức thanh toán'}</TextTitle>
                <TextAddress>
                  {idPayment !== ''
                    ? methodPay?.title
                    : 'Chọn hình thức thanh toán'}
                </TextAddress>
              </View>
              <Image source={IC_ARROW_RIGHT} />
            </ViewInfo>
          </STouch>
        </ScreenScrollWrapper>

        <ViewSubmit>
          <ViewWrapper>
            <TextTotalPrice>{'Thanh toán'}</TextTotalPrice>
            <TextPrice>
              {parseInt(total.total_price).toLocaleString('en')}đ
            </TextPrice>
          </ViewWrapper>
          <STouchOrder onPress={orderItem} disabled={loadingOrder}>
            {loadingOrder ? (
              <SActivityIndicator />
            ) : (
              <TextOrder>{'Đặt hàng'}</TextOrder>
            )}
          </STouchOrder>
        </ViewSubmit>
      </Container>
    </ScreenWrapper>
  );
});

const Container = styled.View`
  flex: 1;
  margin-bottom: ${getBottomSpace() + 32}px;
`;

const Line = styled.View`
  border-top-width: 1px;
  border-top-color: ${Colors.gray7};
`;

const STouch = styled.TouchableOpacity`
  padding: 10px 16px;
  background-color: ${Colors.backgroundColor};
  flex-direction: row;
`;

const SIcon = styled.Image`
  tint-color: ${Colors.orange1};
  width: 20px;
  height: 20px;
`;

const ViewInfo = styled.View`
  flex: 1;
  margin-left: 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TextTitle = styled(Regular)`
  font-size: 16px;
  line-height: ${scale(24)}px;
  color: ${Colors.gray1};
`;

const TextAddress = styled(TextTitle)`
  color: ${Colors.gray4};
`;

const ViewRow = styled.View`
  flex-direction: row;
`;

const TextInfo = styled(TextTitle)`
  font-size: 15px;
`;

const Dive = styled.View`
  height: 50%;
  width: 1px;
  justify-content: center;
  align-self: center;
  background-color: ${Colors.gray3};
  margin: 0 10px;
`;

const TextPrice = styled(Medium)`
  font-size: 16px;
  color: ${Colors.orange1};
`;

const ViewSubmit = styled(ViewRow)`
  align-items: center;
  justify-content: space-between;
  padding: 16px 20px;
  border-top-width: 1px;
  border-top-color: ${Colors.gray7};
`;

const ViewFlexPrice = styled(ViewRow)`
  background-color: ${Colors.backgroundColor};
  margin-top: 2px;
  padding: 12px 16px;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray7};
`;

const TextTotalPrice = styled(TextTitle)`
  font-size: 14px;
`;

const STouchOrder = styled.TouchableOpacity`
  background-color: ${Colors.orange1};
  border-radius: 16px;
  padding: 16px 44px;
`;

const TextOrder = styled(Medium)`
  font-size: 16px;
  text-align: center;
  color: ${Colors.white};
`;

const SActivityIndicator = styled(ActivityIndicator)`
  width: ${scale(34)}px;
`;
export default OrderScreen;
