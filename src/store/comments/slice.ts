import {createDynamicReducer} from '@/utils/createDynamicReducer';

export const {
  setStore: setCommentStore,
  actions: commentActions,
  useByKey: useComment,
  useKeysByQuery: useCommentByQuery,
  getByKey: getCommentByKey,
  reducer: commentReducer,
  getKeysByQuery: getCommentByQuery,
  sync: syncComment,
  setQueries: setCommentQueries,
} = createDynamicReducer('comment', 'id');
