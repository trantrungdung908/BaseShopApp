import React, {memo, useCallback, useState} from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {StatusBarViewTransparent} from '@/components/Header/DynamicHeader';
import {styled} from '@/global';
import {
  Image,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TextInputSubmitEditingEventData,
  View,
} from 'react-native';
import {goBack, navigateToSearchScreen} from '@/utils/navigation';
import {SearchBar} from '@/components/SearchBar';
import {IC_ARROW_LEFT} from '@/assets';
import {Colors} from '@/themes';
import {RawProductsInterface} from '@/store/product';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {Medium, Regular} from '@/components/CommonStyled';
import {ParamsSearchInterface} from '@/store/search';
import useAsyncFn from '@/hooks/useAsyncFn';
import {client} from '@/libs';
import {SearchItem} from '@/screens/Home/components/SearchItem';

export const SearchModal = memo(function () {
  const [searchText, setSearchText] = useState<string>('');
  const [recentSearch, setRecentSearch] = useState<string[]>([]);
  const [searchResult, setSearchResult] = useState<RawProductsInterface[]>([]);

  const [{loading: loadingSearch, error: errorSearch}, onSearch] = useAsyncFn(
    async (text: string) => {
      const paramsSearch: ParamsSearchInterface = {
        search: text,
        page: 1,
        per_page: 10,
      };
      const res = await client.getSearch(paramsSearch);
      setSearchResult(res);
    },
    [searchText],
  );

  const handleSaveSearch = useCallback(
    async (e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
      if (e.nativeEvent.text === '') {
        return;
      }
      navigateToSearchScreen({searchText: e.nativeEvent.text});
      if (recentSearch.includes(searchText)) {
        return;
      }
      recentSearch.unshift(searchText);
      const output = JSON.stringify(recentSearch);
      await AsyncStorage.setItem('search', output);
      setSearchText('');
    },
    [recentSearch, searchText],
  );

  const navigateSearchScreen = useCallback((title: string) => {
    navigateToSearchScreen({searchText: title});
  }, []);

  const {loading} = useAsyncEffect(async () => {
    const data = await AsyncStorage.getItem('search');
    setRecentSearch(JSON.parse(data || ([] as unknown as string)));
  }, []);

  const onTextChange = useCallback(
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

  const handleClearSearch = useCallback(() => {
    AsyncStorage.clear().then(() => setRecentSearch([]));
  }, []);

  return (
    <ScreenWrapper>
      <StatusBarViewTransparent />
      <WrapSearch>
        <STouchBack onPress={goBack}>
          <Image source={IC_ARROW_LEFT} />
        </STouchBack>
        <SearchBar
          containerStyle={styles.containerSearch}
          autoFocus={true}
          onSubmitEditing={handleSaveSearch}
          onSearchTextChange={onTextChange}
          defaultValue={searchText}
        />
      </WrapSearch>
      <Container showsVerticalScrollIndicator={false}>
        {(loadingSearch || searchResult?.length) > 0 ? (
          <ViewResult>
            {searchResult.map((item, index) => {
              return <SearchItem item={item} index={index} key={index} />;
            })}
          </ViewResult>
        ) : (
          <>
            {recentSearch.length > 0 && (
              <View style={styles.colorView}>
                {recentSearch.map((item, index) => {
                  return (
                    <TouchSearch
                      key={index}
                      onPress={() => {
                        navigateSearchScreen(item);
                      }}>
                      <Text>{item}</Text>
                    </TouchSearch>
                  );
                })}
                <STouchDelete onPress={handleClearSearch}>
                  <TextDelete>Xoá Lịch Sử Tìm Kiếm</TextDelete>
                </STouchDelete>
              </View>
            )}
            <ViewSuggest>
              <STexSuggest>Search Suggestions</STexSuggest>
            </ViewSuggest>
          </>
        )}
      </Container>
    </ScreenWrapper>
  );
});

const Container = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {},
}))`
  background-color: ${Colors.gray13};
`;

const STouchBack = styled.TouchableOpacity``;

const WrapSearch = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 20px;
`;

const TouchSearch = styled.TouchableOpacity`
  padding: 10px 20px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray7};
`;

const STouchDelete = styled.TouchableOpacity`
  padding: 10px;
`;

const TextDelete = styled(Regular)`
  text-align: center;
  font-size: 14px;
  color: ${Colors.gray4};
`;

const ViewResult = styled.View`
  background-color: ${Colors.backgroundColor};
`;

const ViewSuggest = styled.View`
  background-color: ${Colors.backgroundColor};
  padding-left: 20px;
  margin-top: 10px;
`;

const STexSuggest = styled(Medium)`
  color: ${Colors.gray1};
  font-size: 16px;
  padding: 10px 0;
`;

const styles = StyleSheet.create({
  containerSearch: {
    flex: 1,
    marginLeft: 10,
    borderRadius: 4,
  },

  submitText: {
    fontSize: 16,
    fontWeight: '500',
  },
  colorView: {
    backgroundColor: Colors.backgroundColor,
  },
  styleList: {
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
});
