import {createDynamicReducer} from '@/utils/createDynamicReducer';

export const {
  setStore: setMediaStore,
  actions: mediaActions,
  useByKey: useMedia,
  useKeysByQuery: useMediaByQuery,
  getByKey: getMediaByKey,
  reducer: mediaReducer,
  getKeysByQuery: getMediaByQuery,
  sync: syncMedia,
  setQueries: setMediaQueries,
} = createDynamicReducer('media', 'id');
