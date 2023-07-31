import {client} from '@/libs';
import store from '@/store';
import {setCategoryQueries, syncCategory} from '@/store/category/slice';

export const requestProductCategories = async () => {
  const res = await client.getProductsCategories();
  let newData = res.map(item => item.id) || [];

  let newQuery = store.getState().category.query.all || [];
  syncCategory(res);
  setCategoryQueries({
    // @ts-ignore
    ['all']: [...new Set([...newQuery, ...newData])],
  });
  return res;
};
