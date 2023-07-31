import React, {memo, useMemo} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes';
import {Medium, Regular} from '@/components/CommonStyled';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import ScreenWrapper from '@/components/ScreenWrapper';
import {scale} from '@/utils/scale';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {useOrder} from '@/store/order';
import moment from 'moment';
import useAsyncFn from '@/hooks/useAsyncFn';
import {putOrders} from '@/store/order/functions';
import ToastService from '@/services/ToastService';
import {goBack} from '@/utils/navigation';
import {ActivityIndicator} from 'react-native';

export interface TrackDetailsInterface {
  idOrder: number;
}

export const TrackOrderDetailsScreen = memo(
  function TrackOrderDetailsScreen({}) {
    const {idOrder} = useNavigationParams<TrackDetailsInterface>();

    const orderDetail = useOrder(idOrder.toString());

    const handlePayment = useMemo(() => {
      if (orderDetail?.payment_method === 'cheque') {
        return 'Kiểm tra thanh toán';
      } else if (orderDetail?.payment_method === 'bacs') {
        return 'Chuyển khoản ngân hàng';
      }
      return 'Trả tiền mặt khi nhận hàng';
    }, [orderDetail?.payment_method]);

    const [{error: errorCancel, loading: loadingCancel}, cancelOrder] =
      useAsyncFn(async () => {
        const params = {
          status: 'cancelled',
        };
        const res = await putOrders(params, idOrder);
        ToastService.show(res);
        goBack();
      }, []);

    if (!orderDetail) {
      return null;
    }

    return (
      <ScreenWrapper>
        <DynamicHeader title="Chi tiết đơn hàng" />
        <Container>
          <ViewOrder>
            <SText>Order #{orderDetail.id}</SText>
            <SText> {moment(orderDetail.date_created).format('l')}</SText>
          </ViewOrder>
          {orderDetail.line_items.map((itemProduct: any) => {
            return (
              <WrapOrder key={itemProduct.id}>
                <SImage source={{uri: itemProduct.image.src}} />
                <ViewInfo>
                  <SName numberOfLines={2}>{itemProduct.name}</SName>
                  {itemProduct.meta_data[0] ? (
                    <SInfo>
                      Color: {itemProduct.meta_data[0]?.display_value}
                    </SInfo>
                  ) : (
                    ''
                  )}
                  {itemProduct.meta_data[1] ? (
                    <SInfo>
                      Size: {itemProduct.meta_data[1]?.display_value}
                    </SInfo>
                  ) : (
                    ''
                  )}
                  <ViewRow>
                    <SInfo>x {itemProduct.quantity}</SInfo>
                    <SInfo>
                      {itemProduct.subtotal}
                      {orderDetail.currency_symbol}
                    </SInfo>
                  </ViewRow>
                </ViewInfo>
              </WrapOrder>
            );
          })}
          <ViewAddress>
            <SText>Thông tin đơn hàng</SText>
            <WrapInfo>
              <STitleAdd>Địa chỉ giao hàng:</STitleAdd>
              <SAddress numberOfLines={2}>
                {orderDetail.billing.address_1}
              </SAddress>
            </WrapInfo>
            <WrapInfo>
              <STitleAdd>Phương thức thanh toán:</STitleAdd>
              <SMethod numberOfLines={2}>{handlePayment}</SMethod>
            </WrapInfo>
            <WrapInfo>
              <STitle>Giảm giá:</STitle>
              <STextInfo>
                -{orderDetail.discount_total}
                {orderDetail.currency_symbol}
              </STextInfo>
            </WrapInfo>
            <WrapInfo>
              <STitle>Tổng cộng:</STitle>
              <STextInfo>
                {orderDetail.total}
                {orderDetail.currency_symbol}
              </STextInfo>
            </WrapInfo>
          </ViewAddress>

          {orderDetail.status === 'pending' ? (
            loadingCancel ? (
              <SActivityIndicator />
            ) : (
              <STouchCancel onPress={cancelOrder}>
                <STexCancel> Huỷ đơn</STexCancel>
              </STouchCancel>
            )
          ) : (
            ''
          )}
        </Container>
      </ScreenWrapper>
    );
  },
);

const ViewOrder = styled.View`
  margin: 10px 20px;
  flex-direction: row;
  justify-content: space-between;
`;

const SText = styled(Medium)`
  color: ${Colors.gray1};
  font-size: 16px;
`;

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    justifyContent: 'center',
  },
}))`
  background-color: ${Colors.gray13};
`;

const WrapOrder = styled.View`
  flex-direction: row;
  margin: 10px 20px;
  background-color: ${Colors.white};
  border-radius: 10px;
  overflow: hidden;
`;

const ViewRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const WrapInfo = styled.View`
  flex-direction: row;
  align-items: center;
  margin: 20px 0 10px 0;
  justify-content: flex-start;
`;

const ViewInfo = styled.View`
  flex: 1;
  padding: 10px;
  min-height: ${scale(100)}px;
`;

const SInfo = styled(Regular)`
  font-size: 15px;
  color: ${Colors.gray1};
  margin-top: 8px;
`;

const SName = styled(Medium)`
  font-size: 16px;
  color: ${Colors.gray1};
`;

const SImage = styled.Image`
  width: ${scale(100)}px;
  height: 100%;
`;

const ViewAddress = styled.View`
  margin: 20px;
`;

const STitle = styled(Regular)`
  font-size: 16px;
  color: ${Colors.gray2};
`;

const STitleAdd = styled(STitle)`
  align-self: flex-start;
`;

const SAddress = styled(SText)`
  padding-right: 50px;
  width: ${scale(250)}px;
  margin-left: 10px;
`;

const SMethod = styled(SText)`
  padding-right: 50px;
  width: ${scale(220)}px;
  margin-left: 10px;
`;

const STextInfo = styled(SText)`
  margin-left: 10px;
`;

const STouchCancel = styled.TouchableOpacity`
  align-items: center;
  border: 1px solid ${Colors.gray1};
  border-radius: 50px;
  margin: 25px auto;
`;

const STexCancel = styled(Regular)`
  color: ${Colors.gray1};
  font-size: 16px;
  padding: 9px 30px;
`;

const SActivityIndicator = styled(ActivityIndicator)`
  width: ${scale(34)}px;
  margin: 0 auto;
`;
