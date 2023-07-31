import {createDynamicReducer} from '@/utils/createDynamicReducer';

export const {
  setStore: setPortfolioStore,
  actions: portfolioActions,
  useByKey: usePortfolio,
  useKeysByQuery: usePortfolioByQuery,
  getByKey: getPortfolioByKey,
  reducer: portfolioReducer,
  getKeysByQuery: getPortfolioByQuery,
  sync: syncPortfolio,
  setQueries: setPortfolioQueries,
} = createDynamicReducer('portfolio', 'id');
