import {client} from '@/libs';
import store from '@/store';
import {setCartQueries, syncCart} from '@/store/cart/slice';
import {
  ParamAddItemInterface,
  ParamCartItemInterface,
  ParamRemoveItemInterface,
} from '@/store/cart/types';

export const requestCarts = async () => {
  const res = await client.getCarts();

  let newData = res.data.items.map(item => item.id) || [];
  syncCart(res.data.items);
  setCartQueries({nonce: res.headers.nonce});
  setCartQueries({
    // @ts-ignore
    ['all']: [...new Set([...newData])],
    // @ts-ignore
    ['total']: res.data.totals,
    // @ts-ignore
    items_count: res.data.items_count,
    // @ts-ignore
    coupons: res.data.coupons,
  });
  return res;
};

export const requestPostItemCart = async (
  params: ParamCartItemInterface,
  nonce: string,
) => {
  const res = await client.postItemCart(params, nonce);
  let newData = res.items.map(item => item.id) || [];
  let newQuery = store.getState().cart.query.all || [];
  syncCart(res.items);
  // @ts-ignore
  setCartQueries({
    ['all']: [...new Set([...newQuery, ...newData])],
    ['total']: res.totals,
    items_count: res.items_count,
  });
  return res;
};

export const requestAddItemCart = async (
  params: ParamAddItemInterface,
  nonce: string,
  // productId:n
) => {
  await client.postAddItem(params, nonce);
};

export const requestRemoveItemCart = async (
  params: ParamRemoveItemInterface,
  nonce: string,
) => {
  const res = await client.postRemoveItem(params, nonce);
  let newData = res.items.map(item => item.id) || [];
  syncCart(res.items);
  // @ts-ignore
  setCartQueries({
    ['all']: [...new Set([...newData])],
    ['total']: res.totals,
    items_count: res.items_count,
  });
  return res;
};
