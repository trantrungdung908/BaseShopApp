import React, {memo, useCallback, useState} from 'react';

import {DynamicHeader} from '@/components/Header/DynamicHeader';
import ScreenWrapper from '@/components/ScreenWrapper';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {
  requestApplyCoupon,
  requestGetCouponsCart,
  requestRemoveCoupon,
} from '@/store/coupons/functions';
import useAutoToastError from '@/hooks/useAutoToastError';
import {BaseRefreshControl} from '@/components/Common/BaseRefreshControl';
import {FlatList, StyleSheet} from 'react-native';
import {useCouponsByQuery} from '@/store/coupons';
import {CouponItem} from '@/screens/Home/components/CouponItem';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {getCartByQuery} from '@/store/cart';
import {goBack} from '@/utils/navigation';
import {Colors} from '@/themes';

export interface CouponModalInterface {
  cartIds: string[];
  total_price: string;
}

export const CouponModal = memo(function CouponModal() {
  const {cartIds, total_price} = useNavigationParams<CouponModalInterface>();
  const [paramsCoupon, setParamsCoupon] = useState({
    page: 1,
    per_page: 100,
  });
  const allCouponIds = useCouponsByQuery('coupons_cart');
  const nonce = getCartByQuery('nonce');
  const code = getCartByQuery('coupons');
  const {call, loading, error} = useAsyncEffect(async () => {
    await requestGetCouponsCart(paramsCoupon);
  }, []);

  const [{loading: loadingCoupon, error: errCoupon}, callCoupon] = useAsyncFn(
    async (value: string) => {
      if (code[0]?.code === value) {
        await requestRemoveCoupon(value, nonce);
        goBack();
        return;
      }
      if (code[0]?.code) {
        await requestRemoveCoupon(code[0]?.code, nonce);
        await requestApplyCoupon(value, nonce);
        goBack();

        return;
      }

      await requestApplyCoupon(value, nonce);
      goBack();

      return;
    },
    [code, nonce],
  );

  const renderItem = useCallback(
    ({item, index}: {item: string; index: number}) => (
      // @ts-ignore
      <CouponItem
        index={index}
        id={item}
        cartIds={cartIds}
        onSelected={callCoupon}
        price={total_price}
      />
    ),
    [callCoupon, cartIds, total_price],
  );

  useAutoToastError(errCoupon);
  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <DynamicHeader title="Mã giảm giá" />
      <FlatList
        style={styles.styleList}
        data={allCouponIds}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
        refreshControl={
          <BaseRefreshControl refreshing={loading} onRefresh={call} />
        }
      />
    </ScreenWrapper>
  );
});

const styles = StyleSheet.create({
  styleList: {
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundColor,
  },
});

export default CouponModal;
