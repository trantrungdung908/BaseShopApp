import {client} from '@/libs';
import store from '@/store';
import {setPaymentQueries, syncPayment} from '@/store/payment/slice';

export const requestPaymentList = async () => {
  const res = await client.getPaymentMethod();

  let newData = res.map(item => item.id) || [];
  let newQuery = store.getState().payment.query.all || [];
  syncPayment(res);

  setPaymentQueries({
    //@ts-ignore
    ['all']: [...new Set([...newQuery, ...newData])],
  });
  return res;
};
