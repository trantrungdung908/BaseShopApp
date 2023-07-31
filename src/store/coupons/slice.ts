import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawCouponsInterface} from '@/store/coupons/types';
import {createSelector} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

export const {
  setStore: setCouponsStore,
  actions: couponsActions,
  useByKey: useCoupons,
  useKeysByQuery: useCouponsByQuery,
  getByKey: getCouponsByKey,
  reducer: couponsReducer,
  getKeysByQuery: getCouponsByQuery,
  sync: syncCoupons,
  setQueries: setCouponsQueries,
} = createDynamicReducer<RawCouponsInterface>('coupons', 'id');

const allCouponsByKey = (state: RootState) => state.coupons.byKey;

const allCouponsByIds = (state: RootState) => state.coupons.query.all || [];

const couponsSelectorFactory = (category_id: number) => {
  return createSelector(allCouponsByIds, allCouponsByKey, (byIds, byKey) => {
    return byIds.filter(
      item => parseInt(byKey[item].product_categories[0]) === category_id,
    );
  });
};

export const getAllCoupons = (category_id: number) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSelector(couponsSelectorFactory(category_id)) || [];
};
