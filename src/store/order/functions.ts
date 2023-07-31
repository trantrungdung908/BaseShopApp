import {client} from '@/libs';
import {
  ParamPutOrderInterface,
  ParamsOrderInterface,
} from '@/store/order/types';
import {setOrderQueries, syncOrder} from '@/store/order/slice';
import {TrackParams} from '@/screens/Home/screens/TrackOrder/TrackOrderScreen';
import store from '@/store';

export const requestOrders = async (params: TrackParams) => {
  const res = await client.getOrders(params);
  let newData = res.map(item => item.id) || [];
  let newQuery = store.getState().order.query.all || [];
  syncOrder(res);

  setOrderQueries({
    // @ts-ignore
    ['all']:
      params.page && params.page > 1
        ? [...new Set([...newQuery, ...newData])]
        : newData,
  });
};

export const requestPostOrder = async (params: ParamsOrderInterface) => {
  const res = await client.postOrder(params);

  return res;
};

export const putOrders = async (params: ParamPutOrderInterface, id: number) => {
  const res = await client.putOrder(params, id);
  if (res) {
    await requestOrders({customer: res.customer_id});
  }
  return 'Huỷ đơn hàng thành công';
};
