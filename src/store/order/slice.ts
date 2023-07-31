import {createDynamicReducer} from '@/utils/createDynamicReducer';

export const {
  setStore: setOrderStore,
  actions: orderActions,
  useByKey: useOrder,
  useKeysByQuery: useOrderByQuery,
  getByKey: getOrderByKey,
  reducer: orderReducer,
  getKeysByQuery: getOrderByQuery,
  sync: syncOrder,
  setQueries: setOrderQueries,
} = createDynamicReducer('order', 'id');
