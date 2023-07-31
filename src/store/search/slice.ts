import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawProductsInterface} from '@/store/product';

export const {
  setStore: setSearchStore,
  actions: searchActions,
  useByKey: useSearch,
  useKeysByQuery: useSearchByQuery,
  getByKey: getSearchByKey,
  reducer: searchReducer,
  getKeysByQuery: getSearchByQuery,
  sync: syncSearch,
  setQueries: setSearchQueries,
} = createDynamicReducer<RawProductsInterface>('search', 'id');
