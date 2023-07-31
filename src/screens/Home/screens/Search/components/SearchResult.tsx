import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {useSearch} from '@/store/search';
import {navigateToProductDetailsScreen} from '@/utils/navigation';
import FastImage from 'react-native-fast-image';
import {scale} from '@/utils/scale';

export interface SearchResultProps {
  id: number;
}

const url =
  'https://cokhihaphuong.com/wp-content/uploads/woocommerce-placeholder-768x768.png';

export const SearchResult = memo(function SearchResult({
  id,
}: SearchResultProps) {
  // @ts-ignore
  const search = useSearch(id);

  const onSelect = useCallback(() => {
    navigateToProductDetailsScreen({idProduct: id});
  }, [search]);

  if (!search) {
    return null;
  }

  return (
    <Container onPress={onSelect}>
      <SearchImage
        source={{uri: search.images[0]?.src ? search.images[0]?.src : url}}
      />
      <ContentView>
        <SearchName numberOfLines={1}>{search.name}</SearchName>
        <SearchCate>{search.categories[0].name}</SearchCate>
        <SeachPrice>{search.price}đ</SeachPrice>
      </ContentView>
    </Container>
  );
});

const Container = styled.TouchableOpacity`
  background-color: ${Colors.white};
  border-radius: 12px;
  margin: 0 6px 12px 6px;
  padding-bottom: 20px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${Colors.gray7};
`;

const ContentView = styled.View`
  margin-left: 12px;
  margin-top: 12px;
`;

const SearchImage = styled(FastImage)`
  width: ${scale(167)}px;
  height: ${scale(165)}px;
`;

const SearchName = styled(Regular)`
  font-size: 16px;
  color: ${Colors.gray1};
  max-width: ${scale(100)}px;
`;

const SearchCate = styled(Regular)`
  margin: 4px 0;
  font-size: 12px;
  color: ${Colors.gray3};
`;

const SeachPrice = styled(Medium)`
  font-size: 15px;
  color: ${Colors.gray1};
  margin-top: 6px;
`;
