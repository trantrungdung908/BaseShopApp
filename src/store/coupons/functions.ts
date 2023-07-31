import {client} from '@/libs';
import {setCouponsQueries, syncCoupons} from '@/store/coupons/slice';
import {setCartQueries, syncCart} from '@/store/cart';
import {CouponParams} from '@/store/coupons/index';
import store from '@/store';

export const requestGetCoupons = async (params: CouponParams) => {
  const res = await client.getCoupon(params);
  let newData = res.map(item => item.id) || [];

  syncCoupons(res);
  setCouponsQueries({
    // @ts-ignore
    ['all']: [...new Set([...newData])],
  });
  return res;
};

export const requestGetCouponsCart = async (params: CouponParams) => {
  const res = await client.getCoupon(params);
  let newData =
    res
      .filter(
        coupons =>
          (coupons.product_ids || []).length <= 0 &&
          (coupons.product_categories || []).length <= 0,
      )
      .map(item => item.id.toString()) || [];
  let newQuery = store.getState().product.query.coupons_cart || [];
  syncCoupons(res);

  setCouponsQueries({
    // @ts-ignore
    ['coupons_cart']: [...new Set([...newQuery, ...newData])],
  });
  return res;
};

export const requestApplyCoupon = async (value: string, nonce: string) => {
  const res = await client.postApplyCoupon(value, nonce);
  let newData = res.items.map(item => item.id) || [];
  syncCart(res.items);
  setCartQueries({
    // @ts-ignore
    ['all']: [...new Set([...newData])],
    // @ts-ignore
    ['total']: res.totals,
    // @ts-ignore
    items_count: res.items_count,
    // @ts-ignore
    coupons: res.coupons,
  });
  return res;
};

export const requestRemoveCoupon = async (value: string, nonce: string) => {
  const res = await client.postRemoveCoupon(value, nonce);
  let newData = res.items.map(item => item.id) || [];
  syncCart(res.items);
  setCartQueries({
    // @ts-ignore
    ['all']: [...new Set([...newData])],
    // @ts-ignore
    ['total']: res.totals,
    // @ts-ignore
    items_count: res.items_count,
    // @ts-ignore
    coupons: res.coupons,
  });
  return res;
};
