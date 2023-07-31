import {client} from '@/libs';
import store from '@/store';
import {ParamsSearchInterface} from '@/store/search/types';
import {setSearchQueries, syncSearch} from '@/store/search/slice';

export const requestGetSearch = async (params: ParamsSearchInterface) => {
  const res = await client.getSearch(params);

  let newData = res.map(item => item.id) || [];
  let newQuery = store.getState().search.query.all || [];

  syncSearch(res);
  setSearchQueries({
    // @ts-ignore
    ['all']:
      params.page && params.page > 1
        ? [...new Set([...newQuery, ...newData])]
        : newData,
  });
  return res;
};
