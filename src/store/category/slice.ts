import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawCategoryInterface} from '@/store/category/types';
import {createSelector} from '@reduxjs/toolkit';
import {useSelector} from 'react-redux';

export const {
  setStore: setCategoryStore,
  actions: categoryActions,
  useByKey: useCategory,
  useKeysByQuery: useCategoryByQuery,
  getByKey: getCategoryByKey,
  reducer: categoryReducer,
  getKeysByQuery: getCategoryByQuery,
  sync: syncCategory,
  setQueries: setCategoryQueries,
} = createDynamicReducer<RawCategoryInterface>('category', 'id');

const allCatByKey = (state: RootState) => state.category.byKey;

const allCatByIds = (state: RootState) => state.category.query.all || [];

const categoriesSelectorFactory = createSelector(
  allCatByIds,
  allCatByKey,
  (byIds, byKey) => {
    return byIds.map(item => byKey[item].name).filter(Boolean);
  },
);

export const getAllCats = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  return useSelector(categoriesSelectorFactory) || [];
};
