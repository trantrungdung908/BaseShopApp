import {client} from '@/libs';
import {setProductQueries, syncProduct} from '@/store/product/slice';
import store from '@/store';
import {ParamsProductInterface} from '@/screens/Home/screens/Products/ListProductScreen';

export const requestProductsListRecommend = async (
  params: ParamsProductInterface,
) => {
  const res = await client.getProducts(params);
  let newData =
    res
      .filter(subItem => (subItem?.tags || []).length > 0)
      .map(item => item.id.toString()) || [];
  let newQuery = store.getState().product.query.recommend || [];
  syncProduct(res);

  setProductQueries({
    // @ts-ignore
    ['recommend']: [...new Set([...newQuery, ...newData])],
  });
  return res;
};

export const requestProductsFlashSale = async (
  params: ParamsProductInterface,
) => {
  const res = await client.getProducts(params);
  let newData =
    res
      .filter(subItem => (subItem?.tags || []).length > 0)
      .map(item => item.id.toString()) || [];
  let newQuery = store.getState().product.query.flashSale || [];
  syncProduct(res);

  setProductQueries({
    // @ts-ignore
    ['flashSale']: [...new Set([...newQuery, ...newData])],
  });
  return res;
};

export const requestProductsList = async (params: ParamsProductInterface) => {
  const res = await client.getProducts(params);
  // console.log('check  res = ', res);
  let newData = res.map(item => item.id) || [];
  let newQuery =
    store.getState().product.query[
      params.category && params.category !== '' ? params.category : 'all'
    ] || [];
  syncProduct(res);
  if (params.category) {
    // @ts-ignore
    setProductQueries({
      [params.category]: [...new Set([...newQuery, ...newData])],
    });
    return;
  }
  setProductQueries({
    // @ts-ignore
    ['all']:
      params.page && params.page > 1
        ? [...new Set([...newQuery, ...newData])]
        : newData,
  });
  return res;
};

export const requestProductVariations = async (id: number) => {
  const res = await client.getProductsVariationsById(id);

  const variations = res
    .map(item => item.attributes)
    .map(item => {
      return {
        id: item[0].id,
        name: item[0].name,
        option: item[0].option,
        // @ts-ignore
        size: item[1]?.option || '',
      };
    });

  setProductQueries({
    // @ts-ignore
    ['variations']: variations,
  });
  return res;
};

export const requestProductByIds = async (id: number) => {
  const res = await client.getProductById(id);
  return res;
};

export const requestProductsByCategory = async (
  params: ParamsProductInterface,
) => {
  const res = await client.getProducts(params);
  let newData = res.map(item => item.id) || [];
  let newQuery =
    store.getState().product.query[
      params.category && params.category !== '' ? params.category : 'all'
    ] || [];

  syncProduct(res);

  setProductQueries({
    // @ts-ignore
    [params.category]: [...new Set([...newQuery, ...newData])],
  });
  return res;
};
