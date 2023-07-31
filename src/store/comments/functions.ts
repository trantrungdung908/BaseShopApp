import {client} from '@/libs';
import store from '@/store';
import {BlogInterface} from '@/screens/Home/screens/Forum/BlogScreen';
import {setCommentQueries, syncComment} from '@/store/comments/slice';
import {ParamsCommentPostInterface} from '@/store/comments/types';

export const requestCommentByPostId = async (params: BlogInterface) => {
  const res = await client.getCommentsByPostId(params);

  let newData = res.map(item => item.id) || [];
  let newQuery = store.getState().comment.query.all || [];
  syncComment(res);

  setCommentQueries({
    // @ts-ignore
    ['all']: [...new Set([...newQuery, ...newData])],
    // @ts-ignore
    ['comments']: [...new Set(res)],
  });
};

export const requestCommentPost = async (
  params: ParamsCommentPostInterface,
) => {
  const res = await client.postCommentPost(params);

  return res;
};
