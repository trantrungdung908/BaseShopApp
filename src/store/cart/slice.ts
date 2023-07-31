import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawItemCart} from '@/store/cart/types';
import {createSelector} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

export const {
  setStore: setCartStore,
  actions: cartActions,
  useByKey: useCart,
  useKeysByQuery: useCartByQuery,
  getByKey: getCartByKey,
  reducer: cartReducer,
  getKeysByQuery: getCartByQuery,
  sync: syncCart,
  setQueries: setCartQueries,
} = createDynamicReducer<RawItemCart>('cart', 'id');

const allCartsByKey = (state: RootState) => state.cart.byKey;

const allCartsByIds = (state: RootState) => state.cart.query.all || [];

const cartsSelectorFactory = createSelector(
  allCartsByIds,
  allCartsByKey,
  (byIds, byKey) => {
    return byIds
      .map(item => {
        return byKey[item];
      })
      .filter(Boolean);
  },
);

export const getAllCarts = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSelector(cartsSelectorFactory) || [];
};
