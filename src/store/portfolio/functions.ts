import {client} from '@/libs';
import store from '@/store';
import {RawPortfolioParam} from '@/store/portfolio/types';
import {setPortfolioQueries, syncPortfolio} from '@/store/portfolio/slice';

export const requestPortfolioList = async (params: RawPortfolioParam) => {
  const res = await client.getPortfolios(params);
  let newData = res.map(item => item.id) || [];
  let newQuery =
    store.getState().portfolio.query[
      params['project-cat'] && params['project-cat'] !== ''
        ? params['project-cat']
        : 'all'
    ] || [];

  syncPortfolio(res);
  if (params['project-cat']) {
    // @ts-ignore
    setPortfolioQueries({
      [params['project-cat']]: [...new Set([...newQuery, ...newData])],
    });
  }
  setPortfolioQueries({
    // @ts-ignore
    ['all']: [...new Set([...newQuery, ...newData])],
  });
  return res;
};
