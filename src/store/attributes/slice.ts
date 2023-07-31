import {createDynamicReducer} from '@/utils/createDynamicReducer';
import {RawAttributesInterface} from '@/store/attributes/types';

export const {
  setStore: setAttributesStore,
  actions: attributesActions,
  useByKey: useAttributes,
  useKeysByQuery: useAttributesByQuery,
  getByKey: getAttributesByKey,
  reducer: attributesReducer,
  getKeysByQuery: getAttributesByQuery,
  sync: syncAttributes,
  setQueries: setAttributesQueries,
} = createDynamicReducer<RawAttributesInterface>('attributes', 'id');


