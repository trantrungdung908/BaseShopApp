import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes';
import {Medium, Regular} from '@/components/CommonStyled';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {IMG_NO_CART} from '@/assets';
import {FlatList, Image} from 'react-native';
import {CartItem} from '../../components/CartItem';
import {
  navigateToOrderScreen,
  navigateToProductDetailsScreen,
  pushToProductDetailsScreen,
} from '@/utils/navigation';
import ScreenWrapper from '@/components/ScreenWrapper';
import {ViewWrapper} from '@/components';
import {scale} from '@/utils/scale';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestCarts} from '@/store/cart/functions';
import useAutoToastError from '@/hooks/useAutoToastError';
import {getCartByQuery, useCartByQuery} from '@/store/cart';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {BaseRefreshControl} from '@/components/Common/BaseRefreshControl';
import {useProductByQuery} from '@/store/product';
import {ProductItem} from '@/screens/Home/screens/Products/components/ProductItem';
import {requestProductsList} from '@/store/product/functions';
import {ParamsProductInterface} from '@/screens/Home/screens/Products/ListProductScreen';
import LoaderRender from '@/components/Views/LoaderRender';
import {requestGetCoupons} from '@/store/coupons/functions';
import {requestListProductAttributes} from '@/store/attributes/functions';

export const CartScreen = memo(function CartScreen() {
  const [params, setParams] = useState<ParamsProductInterface>({
    page: 1,
    per_page: 10,
  });
  const cartIds = useCartByQuery('all');
  const total = getCartByQuery('total');
  const productIds = useProductByQuery('all');

  const {error, loading, call} = useAsyncEffect(async () => {
    await requestCarts();
    await requestGetCoupons({page: 1, per_page: 100});
    await requestListProductAttributes();
  }, []);

  const onNavigateToOrder = useCallback(() => {
    navigateToOrderScreen({
      itemId: cartIds,
      total_price: total.total_items,
    });
    return;
  }, [cartIds, total.total_items]);

  const onPushToProductDetails = useCallback((idProduct: number) => {
    pushToProductDetailsScreen({idProduct});
  }, []);

  const renderItem = useCallback(
    // @ts-ignore
    ({item}) => {
      return (
        <CartItem item={item} onPress={() => onPushToProductDetails(item)} />
      );
    },
    [],
  );

  const renderAnotherProduct = useCallback(
    // @ts-ignore
    ({item}) => {
      return (
        <ProductItem
          item={item}
          onPress={() => navigateToProductDetailsScreen({idProduct: item})}
        />
      );
    },
    [],
  );

  const updateParams = useCallback(async () => {
    if (productIds.length >= 10) {
      setParams(state => ({
        ...state,
        page: (params.page || 0) + 1,
      }));
    }
    return;
  }, [productIds.length, params?.page]);

  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <DynamicHeader title="Giỏ hàng" />
      <Container>
        <FlatList
          data={cartIds}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={'on-drag'}
          keyboardShouldPersistTaps={'always'}
          ListEmptyComponent={
            <WrapNoCart>
              <Image source={IMG_NO_CART} />
              <TextNull>{'Danh sách rỗng'}</TextNull>
            </WrapNoCart>
          }
          refreshControl={
            <BaseRefreshControl refreshing={loading} onRefresh={call} />
          }
          ListFooterComponent={
            <ViewProductOther>
              <WrapTitle>
                <Line />
                <TextOther>Có thể bạn cũng thích</TextOther>
                <Line />
              </WrapTitle>
              <FlatList
                data={productIds}
                renderItem={renderAnotherProduct}
                numColumns={2}
                onEndReached={updateParams}
                onEndReachedThreshold={0.4}
                showsVerticalScrollIndicator={false}
                columnWrapperStyle={{
                  justifyContent: 'space-between',
                }}
              />
            </ViewProductOther>
          }
        />
        <ContainerTotal>
          <ViewWrapper>
            <TextTotalPrice>{'Tổng tiền'}</TextTotalPrice>
            <TextPrice>
              {parseInt(total.total_items).toLocaleString('en')}đ
            </TextPrice>
          </ViewWrapper>
          <STouchOrder onPress={onNavigateToOrder}>
            <TextOrder>{'Đặt hàng'}</TextOrder>
          </STouchOrder>
        </ContainerTotal>
      </Container>
    </ScreenWrapper>
  );
});

const Container = styled.View`
  flex: 1;
  margin-bottom: ${getBottomSpace() + 32}px;
`;

const WrapNoCart = styled.View`
  align-items: center;
  justify-content: center;
  flex: 1;
`;
const TextNull = styled(Regular)`
  font-size: 16px;
  line-height: ${scale(22)}px;
  margin-top: 16px;
  color: ${Colors.gray2};
`;

const ContainerTotal = styled.View`
  background-color: ${Colors.backgroundColor};
  padding: 12px;
  border-top-color: ${Colors.gray7};
  border-top-width: 1px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const TextTotalPrice = styled(Regular)`
  font-size: 14px;
  line-height: ${scale(22)}px;
  color: ${Colors.gray1};
`;

const TextPrice = styled(Medium)`
  font-size: 16px;
  color: ${Colors.orange1};
`;

const STouchOrder = styled.TouchableOpacity`
  background-color: ${Colors.orange1};
  border-radius: 16px;
`;

const TextOrder = styled(Medium)`
  padding: 16px 40px;
  font-size: 16px;
  color: ${Colors.white};
`;

const ViewProductOther = styled.View`
  background-color: ${Colors.gray7};
  padding: 12px;
`;

const WrapTitle = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-bottom: 12px;
`;

const Line = styled.View`
  width: 60px;
  height: 1px;
  background-color: ${Colors.gray4};
`;

const TextOther = styled(Medium)`
  text-align: center;
  color: ${Colors.gray1};
  font-size: 16px;
  margin: 0 12px;
`;

const SLoad = styled(LoaderRender)`
  margin: 12px;
`;

export default CartScreen;
