import React, {memo} from 'react';
import {styled} from '@/global';
import {Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {IC_STAR, IC_STAR_FILL} from '@/assets';
import {RawProductReviewsInterface} from '@/store/reviews';
import {useProduct} from '@/store/product';
import {Image} from 'react-native';
import {scale} from '@/utils/scale';
import {HTMLRenderer} from '@/components/Views/HTMLRender';
import {dateStringToTimestamp, getDateFormat} from '@/services/FormatDate';
import {navigateToProductDetailsScreen} from '@/utils/navigation';

export interface ReviewsItemInterface {
  item: RawProductReviewsInterface;
}

export const ReviewsItem = memo(function ({item}: ReviewsItemInterface) {
  const products = useProduct(item?.product_id.toString());

  if (!products) {
    return null;
  }

  return (
    <STouch
      onPress={() =>
        navigateToProductDetailsScreen({idProduct: item.product_id})
      }>
      <SImage source={{uri: item.reviewer_avatar_urls['96']}} />
      <Container>
        <TitleName>{item.reviewer}</TitleName>
        <HTMLRenderer htmlContent={item.review} />
        <WrapStar>
          {Array.from(Array(item.rating).keys()).map(index => {
            return <Image source={IC_STAR_FILL} key={index} />;
          })}
          {Array.from(Array(5 - item.rating).keys()).map(index => {
            return <Image source={IC_STAR} key={index} />;
          })}
        </WrapStar>
        <TitleDate>
          {getDateFormat(
            dateStringToTimestamp(
              item?.date_created || '1',
              'YYYY-MM-DDThh:mm:ss',
            ),
            'HH:mm DD/MM/YYYY',
          )}
        </TitleDate>

        <WrapProduct>
          <SImageProduct source={{uri: products.images[0].src}} />
          <Info>
            <STitle numberOfLines={1}>{item.product_name}</STitle>
          </Info>
        </WrapProduct>
      </Container>
    </STouch>
  );
});

const STouch = styled.TouchableOpacity`
  flex-direction: row;
  padding: 16px;
  border-color: ${Colors.gray7};
  border-bottom-width: 1px;
`;

const SImage = styled.Image`
  width: ${scale(20)}px;
  height: ${scale(20)}px;
  border-radius: 20px;
`;

const Container = styled.View`
  flex: 1;
  margin-left: 12px;
`;

const WrapStar = styled.View`
  flex-direction: row;
  margin: 4px 0;
  align-items: center;
`;

const TitleName = styled(Regular)`
  font-size: 16px;
  margin-bottom: 4px;
`;

const TitleDate = styled(Regular)`
  font-size: 16px;
  color: ${Colors.gray5};
  margin: 4px 0;
`;

const WrapProduct = styled.View`
  flex-direction: row;
  align-items: center;
`;

const SImageProduct = styled.Image`
  width: ${scale(70)}px;
  height: ${scale(70)}px;
`;

const Info = styled.View`
  flex: 1;
  background-color: ${Colors.gray7};
  height: ${scale(50)}px;
  justify-content: center;
`;

const STitle = styled(TitleName)`
  padding-left: 8px;
`;
