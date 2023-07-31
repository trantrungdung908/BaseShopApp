import {Platform} from 'react-native';
import React, {memo, useMemo} from 'react';
import {styled} from '@/global';
import {IC_HOT, IC_SOLD} from '@/assets';
import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import FastImage from 'react-native-fast-image';
import {useProduct} from '@/store/product';

export interface FlashItemInterface {
  onPress?: () => void;
  item: number;
}
const url =
  'https://cokhihaphuong.com/wp-content/uploads/woocommerce-placeholder-768x768.png';

export const FlashItem = memo(function FlashItem({
  onPress,
  item,
}: FlashItemInterface) {
  const flashProduct = useProduct(item.toString());

  const percentSale = useMemo(() => {
    return Math.round(
      100 -
        (parseInt(flashProduct?.sale_price || '') /
          parseInt(flashProduct?.regular_price || '')) *
          100,
    );
  }, [flashProduct?.sale_price, flashProduct?.regular_price]);

  if (!flashProduct) {
    return null;
  }

  return (
    <STouchProduct key={flashProduct.id} onPress={onPress}>
      {flashProduct.featured && <IconHot source={IC_HOT} />}
      {!flashProduct?.purchasable && <IconSold source={IC_SOLD} />}
      <AvaProduct
        source={{
          uri: flashProduct.images[0]?.src ? flashProduct.images[0]?.src : url,
        }}
        resizeMode={FastImage.resizeMode.contain}>
        {flashProduct.date_on_sale_to && (
          <BannerSale>
            <SSale>{percentSale}%</SSale>
            <SDiscount>GIẢM</SDiscount>
            <Border />
          </BannerSale>
        )}
      </AvaProduct>
      <ContentView>
        <TextPrice>
          {flashProduct.date_on_sale_to
            ? `${parseInt(flashProduct.sale_price).toLocaleString('en')}đ`
            : `${parseInt(flashProduct.regular_price).toLocaleString('en')}đ`}
        </TextPrice>
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

const STouchProduct = styled.TouchableOpacity`
  background-color: ${Colors.white};
  border-radius: 8px;
  margin-right: 8px;
  padding: 12px 4px;
  overflow: hidden;
`;

const ContentView = styled.View`
  padding-left: 12px;
  margin-top: 12px;
`;

const AvaProduct = styled(FastImage)`
  width: ${scale(150)}px;
  height: ${scale(120)}px;
`;

const TextPrice = styled(Medium)`
  font-size: 15px;
  color: ${Colors.red1};
  text-align: center;
`;

const BannerSale = styled.View`
  width: ${scale(30)}px;
  height: ${scale(35)}px;
  background-color: ${Colors.orange1};
  position: absolute;
  right: 0;
`;
const Border = styled.View`
  position: absolute;
  border-left-width: ${scale(15)}px;
  border-right-width: ${scale(15)}px;
  border-bottom-width: ${scale(8)}px;
  bottom: ${Platform.OS === 'android' ? -8.5 : -9}px;
  right: 0;
  left: 0;
  border-left-color: ${Colors.orange1};
  border-right-color: ${Colors.orange1};
  border-top-color: transparent;
  border-bottom-color: transparent;
`;

const SSale = styled(Regular)`
  text-align: center;
  margin-top: ${Platform.OS === 'android' ? 0 : 4}px;
  font-size: 14px;
  color: ${Colors.red1};
`;

const SDiscount = styled(Regular)`
  color: ${Colors.backgroundColor};
  font-size: 12px;
  text-align: center;
  margin-top: ${Platform.OS === 'android' ? 0 : 2}px;
`;
