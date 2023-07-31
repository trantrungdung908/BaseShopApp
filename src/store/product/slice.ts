import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawProductsInterface} from '@/store/product/types';
import {useSelector} from 'react-redux';
import {createSelector} from '@reduxjs/toolkit';

export const {
  setStore: setProductStore,
  actions: productActions,
  useByKey: useProduct,
  useKeysByQuery: useProductByQuery,
  getByKey: getProductByKey,
  reducer: productReducer,
  getKeysByQuery: getProductByQuery,
  sync: syncProduct,
  setQueries: setProductQueries,
} = createDynamicReducer<RawProductsInterface>('product', 'id');

const allProductsByKey = (state: RootState) => state.product.byKey;

const allProductsByIds = (state: RootState) => state.product.query.all || [];

const productsSelectorFactory = createSelector(
  allProductsByIds,
  allProductsByKey,
  (byIds, byKey) => {
    return byIds
      .map(item => {
        return byKey[item];
      })
      .filter(Boolean)
      .slice(0, 6);
  },
);

export const getAllProducts = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSelector(productsSelectorFactory) || [];
};
