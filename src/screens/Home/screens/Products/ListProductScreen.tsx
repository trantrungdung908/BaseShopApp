import React, {memo, useCallback, useState} from 'react';
import {FlatList, StyleSheet} from 'react-native';
import {ScrollTabBarProduct, TYPE_TAB} from './components/ScrollTabBarProduct';
import PagerView from 'react-native-pager-view';
import {DynamicHeaderWithSearch} from '@/components/Header/DynamicHeaderWithSearch';
import ScreenWrapper from '@/components/ScreenWrapper';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestProductsList} from '@/store/product/functions';
import {requestProductCategories} from '@/store/category/functions';
import useAutoToastError from '@/hooks/useAutoToastError';
import {Colors} from '@/themes';
import {TabProductList} from '@/screens/Home/screens/Products/Tabs/TabProductList';
import {RawProductsInterface, useProductByQuery} from '@/store/product';
import {navigateToFilterProductModal} from '@/utils/navigation';
import {BaseRefreshControl} from '@/components/Common/BaseRefreshControl';
import {styled} from '@/global';
import {ParamsSearchInterface} from '@/store/search';
import {client} from '@/libs';
import {SearchItem} from '@/screens/Home/components/SearchItem';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {scale} from '@/utils/scale';
import {StatusBarViewTransparent} from '@/components/Header/DynamicHeader';
import {useCartByQuery} from '@/store/cart';

export interface ParamsProductInterface {
  page: number;
  per_page: number;
  search?: string;
  category?: string;
  attribute?: string[];
  attribute_term?: string[];
  tag?: number;
}

export const ListProductScreen = memo(function ListProductScreen() {
  const pagerViewRef = React.useRef<PagerView>();
  const [searchText, setSearchText] = useState<string>('');
  const [searchResult, setSearchResult] = useState<RawProductsInterface[]>([]);
  const [paramsProduct, setParamsProduct] = useState<ParamsProductInterface>({
    page: 1,
    per_page: 10,
    search: '',
    category: '',
  });
  const allProducts = useProductByQuery(
    paramsProduct.category ? paramsProduct.category : 'all',
  );
  const itemsCount = useCartByQuery('all');

  const {error, loading, call} = useAsyncEffect(async () => {
    await requestProductsList(paramsProduct);
    await requestProductCategories();
  }, [paramsProduct]);

  const onChangeTab = useCallback((value: TYPE_TAB) => {
    if (value === TYPE_TAB.ALL) {
      pagerViewRef.current?.setPage(0);
      setParamsProduct(state => ({...state, page: 1, category: ''}));
      return;
    } else if (value === TYPE_TAB.ACCESSORIES) {
      pagerViewRef.current?.setPage(1);
      setParamsProduct(state => ({...state, page: 1, category: '21'}));
      return;
    } else if (value === TYPE_TAB.CLOCKS) {
      pagerViewRef.current?.setPage(2);
      setParamsProduct(state => ({...state, page: 1, category: '28'}));

      return;
    } else if (value === TYPE_TAB.COOKING) {
      pagerViewRef.current?.setPage(3);
      setParamsProduct(state => ({...state, page: 1, category: '29'}));

      return;
    } else if (value === TYPE_TAB.FURNITURE) {
      pagerViewRef.current?.setPage(4);
      setParamsProduct(state => ({...state, page: 1, category: '33'}));

      return;
    } else if (value === TYPE_TAB.LIGHTING) {
      pagerViewRef.current?.setPage(5);
      setParamsProduct(state => ({...state, page: 1, category: '42'}));

      return;
    } else {
      pagerViewRef.current?.setPage(6);
      setParamsProduct(state => ({...state, page: 1, category: '49'}));
      return;
    }
  }, []);

  const onFilter = useCallback(() => {
    navigateToFilterProductModal({
      paramFilter: {...paramsProduct, page: 1, per_page: 10},
      onPressFilter: setParamsProduct,
    });
  }, [paramsProduct]);

  const [{loading: loadingSearch, error: errorSearch}, onSearch] = useAsyncFn(
    async (text: string) => {
      const params: ParamsSearchInterface = {
        search: text,
        page: 1,
        per_page: 10,
      };
      const res = await client.getSearch(params);
      setSearchResult(res);
    },
    [searchText],
  );

  const onChangeSearch = useCallback(
    (text: string) => {
      setSearchText(text);
      if (text === '') {
        setSearchResult([]);
      } else {
        setSearchText(text);
        onSearch(text).then();
      }
    },
    [onSearch],
  );

  const renderSearch = useCallback(
    ({item, index}: {item: RawProductsInterface; index: number}) => (
      // @ts-ignore
      <SearchItem item={item} index={index} />
    ),
    [],
  );

  const onRefresh = useCallback(async () => {
    onSearch(searchText).then();
  }, [onSearch, searchText]);

  const updateParams = useCallback(async () => {
    if (allProducts.length >= 10) {
      setParamsProduct(state => ({
        ...state,
        page: (paramsProduct?.page || 0) + 1,
      }));
    }
    return;
  }, [allProducts.length, paramsProduct?.page]);

  useAutoToastError(error);
  useAutoToastError(errorSearch);

  return (
    <ScreenWrapper>
      <StatusBarViewTransparent />
      <DynamicHeaderWithSearch
        isSearch
        onChangeText={onChangeSearch}
        onFilter={onFilter}
        amount={itemsCount}
      />

      {(loadingSearch || searchResult?.length) > 0 && (
        <ViewResult>
          <FlatList
            style={styles.styleList}
            data={searchResult}
            showsVerticalScrollIndicator={false}
            renderItem={renderSearch}
            refreshControl={
              <BaseRefreshControl
                refreshing={loadingSearch}
                onRefresh={onRefresh}
              />
            }
          />
        </ViewResult>
      )}

      <ScrollTabBarProduct onChangeTab={onChangeTab} />
      <PagerView
        ref={pagerViewRef as any}
        initialPage={0}
        scrollEnabled={false}
        style={styles.container}>
        <TabProductList
          productIds={allProducts}
          loading={loading}
          onChangeParams={call}
          onUpdate={updateParams}
        />
        <TabProductList
          productIds={allProducts}
          loading={loading}
          onChangeParams={call}
        />
        <TabProductList
          productIds={allProducts}
          loading={loading}
          onChangeParams={call}
        />
        <TabProductList
          productIds={allProducts}
          loading={loading}
          onChangeParams={call}
        />
        <TabProductList
          productIds={allProducts}
          loading={loading}
          onChangeParams={call}
        />
        <TabProductList
          productIds={allProducts}
          loading={loading}
          onChangeParams={call}
        />
      </PagerView>
    </ScreenWrapper>
  );
});

const ViewResult = styled.View`
  position: absolute;
  z-index: 100;
  border-radius: 16px;
  background-color: transparent;
  left: 30px;
  right: 30px;
  top: ${scale(50)}px;
  border-color: ${Colors.gray8};
  border-width: 1px;
`;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray7,
  },
  styleList: {
    height: scale(160),
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: Colors.backgroundColor,
  },
});

export default ListProductScreen;
