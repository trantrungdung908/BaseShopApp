import {client} from '@/libs';
import {ParamsPostInterface} from '@/screens/Home/screens/Forum/BlogDetailScreen';
import store from '@/store';
import {setPostQueries, syncPost} from '@/store/posts/slice';

export const requestPostsList = async (params: ParamsPostInterface) => {
  const res = await client.getPost(params);
  let newData = res.map(item => item.id) || [];
  let newQuery = store.getState().post.query.all || [];
  syncPost(res);

  setPostQueries({
    //@ts-ignore
    ['all']:
      params.page && params.page > 1
        ? [...new Set([...newQuery, ...newData])]
        : newData,
  });
};
