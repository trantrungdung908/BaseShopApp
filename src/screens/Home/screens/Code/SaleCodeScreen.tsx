import React, {memo} from 'react';
import {styled} from '@/global';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {scale} from '@/utils/scale';
import ScreenWrapper from '@/components/ScreenWrapper';
import {IMG_SUPER_SALE} from '@/assets';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestListProductAttributes} from '@/store/attributes/functions';
import {requestGetCoupons} from '@/store/coupons/functions';
import {useCategoryByQuery} from '@/store/category';
import {ListCouponByCategories} from './components/ListCouponByCategories';

export const SaleCodeScreen = memo(function SaleCodeScreen() {
  const allCategoriesIds = useCategoryByQuery('all');

  const {loading, error, call} = useAsyncEffect(async () => {
    await requestGetCoupons({page: 1, per_page: 100});
    await requestListProductAttributes();
  });
  return (
    <ScreenWrapper>
      <DynamicHeader title={'Mã giảm giá'} />
      <Container>
        <Banner source={IMG_SUPER_SALE} />
        {allCategoriesIds.map((item: string, index: number) => {
          return <ListCouponByCategories key={index} id={item} />;
        })}
      </Container>
    </ScreenWrapper>
  );
});

const Banner = styled.Image`
  width: 100%;
  height: ${scale(200)}px;
`;

const Container = styled.ScrollView``;

export default SaleCodeScreen;
