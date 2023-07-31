import {ViewProps} from 'react-native';
import React, {memo} from 'react';
import {styled} from '@/global';
import {IC_HOT, IC_SOLD, IC_STAR, IC_STAR_FILL} from '@/assets';
import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import FastImage from 'react-native-fast-image';
import {useProduct} from '@/store/product';
import {getProductsByReviews} from '@/store/reviews';
import {getBottomSpace} from 'react-native-iphone-x-helper';

interface ProductItemInterface extends ViewProps {
  onPress?: () => void;
  item: number;
}
const url =
  'https://cokhihaphuong.com/wp-content/uploads/woocommerce-placeholder-768x768.png';

export const ProductItem = memo(function ProductItem({
  onPress,
  item,
}: ProductItemInterface) {
  const product = useProduct(item.toString());
  const reviews = getProductsByReviews(product?.id || 0);
  if (!product) {
    return null;
  }

  return (
    <STouchProduct key={product.id} onPress={onPress}>
      {product.featured && <IconHot source={IC_HOT} />}
      {product?.stock_status === 'outofstock' && <IconSold source={IC_SOLD} />}
      <AvaProduct
        source={{uri: product.images[0]?.src ? product.images[0]?.src : url}}
        resizeMode={FastImage.resizeMode.contain}
      />
      <ContentView>
        <TextName numberOfLines={2}>{product.name}</TextName>
        <TextSold>{product.categories[0].name}</TextSold>
        <ContainerPrice>
          <TextPrice>{parseInt(product.price).toLocaleString('en')}đ</TextPrice>
          <TotalRate>
            {Array.from(Array(parseInt(product.average_rating)).keys()).map(
              index => {
                return <SImage source={IC_STAR_FILL} key={index} />;
              },
            )}
            {Array.from(Array(5 - parseInt(product.average_rating)).keys()).map(
              index => {
                return <SImage source={IC_STAR} key={index} />;
              },
            )}
          </TotalRate>
        </ContainerPrice>
      </ContentView>
    </STouchProduct>
  );
});

const IconSold = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  z-index: 1;
  right: 0;
  margin-top: 4px;
  margin-right: 4px;
`;

const IconHot = styled.Image`
  width: 32px;
  height: 32px;
  position: absolute;
  z-index: 1;
  top: 5px;
  left: 5px;
`;

const ContainerPrice = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-right: 12px;
`;

const STouchProduct = styled.TouchableOpacity`
  background-color: ${Colors.white};
  border-radius: 8px;
  margin-bottom: 12px;
  padding: 12px 4px 12px 4px;
  overflow: hidden;
  border-width: 1px;
  border-color: ${Colors.gray7};
`;

const ContentView = styled.View`
  margin-left: 12px;
  margin-top: 12px;
`;

const AvaProduct = styled(FastImage)`
  width: ${scale(160)}px;
  height: ${scale(165)}px;
`;

const TextName = styled(Regular)`
  font-size: 14px;
  color: ${Colors.gray1};
  max-width: ${scale(130)}px;
`;

const TextSold = styled(Regular)`
  margin: 8px 0;
  font-size: 12px;
  color: ${Colors.gray3};
`;

const TextPrice = styled(Medium)`
  font-size: 15px;
  color: ${Colors.red1};
`;

const SImage = styled.Image`
  width: ${scale(12)}px;
  height: ${scale(12)}px;
`;

const TotalRate = styled.View`
  flex-direction: row;
  align-items: center;
`;

const STextTotal = styled(Regular)`
  font-size: 12px;
  color: ${Colors.gray4};
  margin-left: 4px;
  margin-top: 2px;
`;
