import React, {memo, useCallback, useState} from 'react';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {styled} from '@/global';
import {Colors} from '@/themes';
import ScreenWrapper from '@/components/ScreenWrapper';
import PagerView from 'react-native-pager-view';
import ScrollBarPortfolio, {
  TYPE_TAB_PORTFOLIO,
} from '@/screens/Portfolio/components/ScrollBarPortfolio';
import {StyleSheet} from 'react-native';
import {RawPortfolioParam} from '@/store/portfolio/types';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestPortfolioList} from '@/store/portfolio/functions';
import {usePortfolioByQuery} from '@/store/portfolio';
import {AllTabList} from '@/screens/Portfolio/Tabs/AllTabList';
import useAutoToastError from '@/hooks/useAutoToastError';

export const PortfolioScreen = memo(function PortfolioScreen() {
  const [params, setParams] = useState<RawPortfolioParam>({
    page: 1,
    per_page: 10,
  });

  const {error, loading, call} = useAsyncEffect(async () => {
    return await requestPortfolioList(params);
  }, [params]);
  const allPortfolio = usePortfolioByQuery('all');

  const pagerViewRef = React.useRef<PagerView>();
  const onChangeTab = useCallback((value: TYPE_TAB_PORTFOLIO) => {
    if (value === TYPE_TAB_PORTFOLIO.ALL) {
      pagerViewRef.current?.setPage(0);
      setParams(params);
      return;
    } else if (value === TYPE_TAB_PORTFOLIO.ACCESSORIES) {
      pagerViewRef.current?.setPage(1);
      setParams(state => ({...state, 'project-cat': '20'}));
      return;
    } else if (value === TYPE_TAB_PORTFOLIO.DECOR) {
      pagerViewRef.current?.setPage(2);
      setParams(state => ({...state, 'project-cat': '30'}));
      return;
    } else if (value === TYPE_TAB_PORTFOLIO.FURNITURE) {
      pagerViewRef.current?.setPage(3);
      setParams(state => ({...state, 'project-cat': '32'}));
      return;
    } else if (value === TYPE_TAB_PORTFOLIO.KITCHEN) {
      pagerViewRef.current?.setPage(4);
      setParams(state => ({...state, 'project-cat': '39'}));
      return;
    } else {
      pagerViewRef.current?.setPage(5);
      setParams(state => ({...state, 'project-cat': '41'}));
      return;
    }
  }, []);

  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Portfolio'} hideGoBack={true} />
      <ScrollBarPortfolio onChangeTab={onChangeTab} />
      <PagerView
        ref={pagerViewRef as any}
        initialPage={0}
        scrollEnabled={false}
        style={styles.container}>
        <AllTabList
          portfolioIds={allPortfolio}
          loading={loading}
          onChangeParams={call}
        />
        <AllTabList
          portfolioIds={allPortfolio}
          loading={loading}
          onChangeParams={call}
        />
        <AllTabList
          portfolioIds={allPortfolio}
          loading={loading}
          onChangeParams={call}
        />
        <AllTabList
          portfolioIds={allPortfolio}
          loading={loading}
          onChangeParams={call}
        />
        <AllTabList
          portfolioIds={allPortfolio}
          loading={loading}
          onChangeParams={call}
        />
        <AllTabList
          portfolioIds={allPortfolio}
          loading={loading}
          onChangeParams={call}
        />
      </PagerView>
    </ScreenWrapper>
  );
});

const ViewSearch = styled.View`
  background-color: ${Colors.backgroundColor};
  padding: 5px 15px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray7,
  },
});

export default PortfolioScreen;
