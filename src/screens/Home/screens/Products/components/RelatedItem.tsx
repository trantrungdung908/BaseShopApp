import React, {memo} from 'react';
import {styled} from '@/global';
import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import FastImage from 'react-native-fast-image';
import {useProduct} from '@/store/product';

export interface RelatedItemInterface {
  id: number;
  onPress?: () => void;
}

export const RelatedItem = memo(function RelatedItem({
  onPress,
  id,
}: RelatedItemInterface) {
  const product = useProduct(id.toString());

  if (!product) {
    return null;
  }

  return (
    <STouchRelated key={product.id} onPress={onPress}>
      <SImage source={{uri: product.images[0]?.src}} />
      <Content>
        <TextName numberOfLines={2}>{product.name}</TextName>
        <TextCate>{product.categories[0].name}</TextCate>
        <TextPrice>{parseInt(product.price).toLocaleString('en')}đ</TextPrice>
      </Content>
    </STouchRelated>
  );
});

const STouchRelated = styled.TouchableOpacity`
  border-radius: 12px;
  overflow: hidden;
  justify-content: center;
  border: 1px solid ${Colors.gray7};
  margin: 0 12px 0 0;
`;

const Content = styled.View`
  margin-top: 12px;
  padding: 12px 4px;
`;

const SImage = styled(FastImage)`
  width: ${scale(100)}px;
  height: ${scale(100)}px;
`;

const TextName = styled(Regular)`
  font-size: 16px;
  color: ${Colors.gray1};
  max-width: ${scale(80)}px;
`;

const TextCate = styled(Regular)`
  margin: 6px 0;
  font-size: 12px;
  color: ${Colors.gray3};
`;

const TextPrice = styled(Medium)`
  font-size: 15px;
  color: ${Colors.red1};
`;
