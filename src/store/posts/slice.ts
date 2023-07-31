import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawPostsInterface} from '@/store/posts/types';

export const {
  setStore: setPostStore,
  actions: postActions,
  useByKey: usePost,
  useKeysByQuery: usePostByQuery,
  getByKey: getPostByKey,
  reducer: postReducer,
  getKeysByQuery: getPostByQuery,
  sync: syncPost,
  setQueries: setPostQueries,
} = createDynamicReducer<RawPostsInterface>('post', 'id');
