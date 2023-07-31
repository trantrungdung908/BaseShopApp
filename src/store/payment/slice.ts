import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawPaymentInterface} from '@/store/payment/types';

export const {
  setStore: setPaymentStore,
  actions: paymentActions,
  useByKey: usePayment,
  useKeysByQuery: usePaymentByQuery,
  getByKey: getPaymentByKey,
  reducer: paymentReducer,
  getKeysByQuery: getPaymentByQuery,
  sync: syncPayment,
  setQueries: setPaymentQueries,
} = createDynamicReducer<RawPaymentInterface>('payment', 'id');
