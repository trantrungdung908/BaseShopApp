import React, {memo, useCallback, useState} from 'react';
import {EmptyHeader} from '@/components/Header/DynamicHeader';
import ScreenWrapper from '@/components/ScreenWrapper';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {SearchBar} from '@/components/SearchBar';
import {FlatList, StyleSheet, View} from 'react-native';
import {EmptyView} from '@/components/Views/EmptyView';
import {getSearchByQuery, ParamsSearchInterface} from '@/store/search';
import {requestGetSearch} from '@/store/search/functions';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {BaseRefreshControl} from '@/components/Common/BaseRefreshControl';
import {SearchResult} from './components/SearchResult';
import useAutoToastError from '@/hooks/useAutoToastError';
import {BaseStyles} from '@/themes/BaseStyles';
import LoaderRender from '@/components/Views/LoaderRender';
import {styled} from '@/global';

export interface SearchScreenInterface {
  searchText?: string;
}

export const SearchScreen = memo(function SearchScreen() {
  const {searchText} = useNavigationParams<SearchScreenInterface>();
  const [paramsSearch, setParamsSearch] = useState<ParamsSearchInterface>({
    search: searchText || '',
    page: 1,
    per_page: 10,
  });

  const {error, loading, call} = useAsyncEffect(async () => {
    return await requestGetSearch(paramsSearch);
  }, [paramsSearch]);

  const allSearch = getSearchByQuery('all');

  const renderSearchItem = useCallback(({item}: any) => {
    return <SearchResult id={item} />;
  }, []);

  const onChangeText = useCallback((text: string) => {
    setParamsSearch(state => ({...state, search: text, page: 1}));
  }, []);

  const renderEmptyView = useCallback(() => {
    return (
      <View style={styles.emptyList}>
        <EmptyView />
      </View>
    );
  }, []);

  const onRefresh = useCallback(() => {
    setParamsSearch(state => ({...state, page: 1}));
  }, []);

  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <EmptyHeader>
        <SearchBar
          containerStyle={styles.searchStyle}
          onSearchTextChange={onChangeText}
        />
      </EmptyHeader>

      <FlatList
        data={allSearch}
        // @ts-ignore
        renderItem={renderSearchItem}
        numColumns={2}
        contentContainerStyle={[BaseStyles.ml12, BaseStyles.mt16]}
        ListEmptyComponent={loading ? <SLoad /> : renderEmptyView}
        refreshControl={
          <BaseRefreshControl onRefresh={onRefresh} refreshing={loading} />
        }
      />
    </ScreenWrapper>
  );
});

const SLoad = styled(LoaderRender)`
  flex: 1;
  padding: 16px;
`;

const styles = StyleSheet.create({
  searchStyle: {
    flex: 1,
    height: 40,
    borderRadius: 4,
    marginRight: 20,
  },
  emptyList: {
    marginTop: 50,
  },
});

export default SearchScreen;
