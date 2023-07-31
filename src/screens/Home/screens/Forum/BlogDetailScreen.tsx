import React, {memo, useCallback, useMemo, useState} from 'react';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {SearchBar} from '@/components/SearchBar';
import ScreenWrapper from '@/components/ScreenWrapper';
import {styled} from '@/global';
import {scale} from '@/utils/scale';
import {Colors} from '@/themes';
import {FlatList, Platform, StyleSheet} from 'react-native';
import {BaseRefreshControl} from '@/components/Common/BaseRefreshControl';
import LoaderRender from '@/components/Views/LoaderRender';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import useAutoToastError from '@/hooks/useAutoToastError';
import {requestPostsList} from '@/store/posts/functions';
import {RawPostsInterface, usePostByQuery} from '@/store/posts';
import {BlogItem} from '@/screens/Home/screens/Forum/components/BlogItem';
import {navigateToBlogScreen} from '@/utils/navigation';
import {client} from '@/libs';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {ParamsSearchInterface} from '@/store/search';
import {SearchPost} from './components/SearchPost';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

export interface ParamsPostInterface {
  page: number;
  per_page: number;
  search?: string;
}

export const BlogDetailScreen = memo(function () {
  const [paramsPost, setParamsPost] = useState<ParamsPostInterface>({
    page: 1,
    per_page: 10,
  });

  const [searchResult, setSearchResult] = useState<RawPostsInterface[]>([]);
  const [searchText, setSearchText] = useState<string>('');

  const postIds = usePostByQuery('all');
  const insets = useSafeAreaInsets();

  const {value, call, error, loading} = useAsyncEffect(async () => {
    return requestPostsList(paramsPost);
  }, [paramsPost]);

  const onNavigateToBlogScreen = (idBlog: number) => {
    // @ts-ignore
    navigateToBlogScreen({idBlog});
  };

  const [{loading: loadingSearch, error: errorSearch}, onSearchPost] =
    useAsyncFn(
      async (text: string) => {
        const params: ParamsSearchInterface = {
          search: text,
          page: 1,
          per_page: 10,
        };
        const res = await client.getSearchPost(params);
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
        onSearchPost(text).then();
      }
    },
    [onSearchPost],
  );

  const renderSearch = useCallback(
    ({item, index}: {item: RawPostsInterface; index: number}) => (
      <SearchPost
        // @ts-ignore
        item={item}
        index={index}
        isLast={index === searchResult.length - 1}
      />
    ),
    [searchResult.length],
  );

  const renderItem = useCallback(
    // @ts-ignore
    ({item, index}) => {
      return (
        <BlogItem
          item={item}
          index={index}
          onPress={() => {
            onNavigateToBlogScreen(item);
          }}
        />
      );
    },
    [],
  );

  const updateParams = useCallback(async () => {
    if (postIds.length >= 10) {
      setParamsPost(state => ({
        ...state,
        page: (paramsPost?.page || 0) + 1,
      }));
    }
    return;
  }, [paramsPost?.page, postIds.length]);

  const onRefresh = useCallback(async () => {
    onSearchPost(searchText).then();
  }, [onSearchPost, searchText]);

  const topScale = useMemo(() => {
    if (Platform.OS === 'android') {
      return insets.top + 100;
    }
    return insets.top + 100;
  }, [insets.top]);

  useAutoToastError(error);
  return (
    <ScreenWrapper>
      <DynamicHeader title={'Blog'} />
      <WrapSearch>
        <SearchBar
          placeholder="Tìm kiếm bài đăng"
          containerStyle={styles.searchStyle}
          onSearchTextChange={onChangeSearch}
        />
      </WrapSearch>

      {(loadingSearch || searchResult?.length) > 0 && (
        <ViewResult
          style={{
            top: topScale,
          }}>
          <FlatList
            style={styles.flatlist}
            data={searchResult}
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
      <FlatList
        keyboardDismissMode={'on-drag'}
        keyboardShouldPersistTaps={'always'}
        style={styles.list}
        data={postIds}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        onEndReached={updateParams}
        onEndReachedThreshold={0.01}
        keyExtractor={item => item.toString()}
        contentContainerStyle={[styles.container]}
        ListFooterComponent={loading ? <SLoad /> : null}
        refreshControl={
          <BaseRefreshControl onRefresh={call} refreshing={loading} />
        }
        ListEmptyComponent={loading ? <SLoad /> : null}
      />
    </ScreenWrapper>
  );
});

const WrapSearch = styled.View`
  height: ${scale(50)}px;
  padding: 6px 16px;
  background-color: ${Colors.white};
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray7};
`;

const SLoad = styled(LoaderRender)`
  margin: 12px 16px;
`;

const ViewResult = styled.View`
  position: absolute;
  z-index: 100;
  border-radius: 16px;
  background-color: transparent;
  left: 30px;
  right: 30px;
  border-color: ${Colors.gray8};
  border-width: 1px;
`;

const styles = StyleSheet.create({
  container: {
    paddingBottom: getBottomSpace() + 60,
  },
  searchStyle: {
    flex: 1,
    height: 40,
    marginHorizontal: 16,
  },
  flatlist: {
    height: scale(150),
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  list: {
    flex: 1,
    backgroundColor: Colors.gray7,
  },
});
