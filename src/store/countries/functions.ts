import {client} from '@/libs';
import store from '@/store';
import {setCountryQueries, syncCountry} from '@/store/countries/slice';

export const requestGetListCountry = async () => {
  const res = await client.getListCountry();

  let newData = res.map(item => item.code) || [];
  let newQuery = store.getState().country.query.all || [];

  syncCountry(res);
  setCountryQueries({
    // @ts-ignore
    ['all']: [...new Set([...newQuery, ...newData])],
  });
  return res;
};
