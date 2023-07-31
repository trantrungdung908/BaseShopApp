import {client} from '@/libs';
import store from '@/store';
import {setMediaQueries, syncMedia} from '@/store/media/slice';

export const requestGetMediaById = async (id: number) => {
  const res = await client.getMediaById(id);
  let newData = [res.id] || [];
  let newQuery = store.getState().media.query.all || [];

  syncMedia([res]);
  setMediaQueries({
    // @ts-ignore
    ['all']: [...new Set([...newQuery, ...newData])],
  });
  return res;
};
