import {Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import React, {memo, useCallback} from 'react';
import styled from 'styled-components/native';
import FastImage from 'react-native-fast-image';
import {scale} from '@/utils/scale';
import {navigateToProductDetailsScreen} from '@/utils/navigation';
import {RawProductsInterface} from '@/store/product';

const url =
  'https://cokhihaphuong.com/wp-content/uploads/woocommerce-placeholder-768x768.png';

interface SearchItemInterface {
  item: RawProductsInterface;
  index: number;
}

// @ts-ignore
export const SearchItem = memo(function SearchItem({
  item,
  index,
}: SearchItemInterface) {
  const onSelect = useCallback(() => {
    navigateToProductDetailsScreen({idProduct: item.id});
  }, [item]);

  return (
    <Container>
      <STouch onPress={onSelect}>
        <SImage
          source={{uri: item.images[0]?.src ? item.images[0]?.src : url}}
        />
        <SText>{item.name}</SText>
      </STouch>
    </Container>
  );
});

const Container = styled.View`
  padding: 10px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray7};
`;

const STouch = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const SImage = styled(FastImage)`
  width: ${scale(40)}px;
  height: ${scale(40)}px;
`;

const SText = styled(Regular)`
  margin-left: 10px;
`;
