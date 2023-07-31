import React, {memo, useCallback} from 'react';
import {styled} from '@/global';
import {Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import ScreenWrapper from '@/components/ScreenWrapper';
import {getAllCoupons} from '@/store/coupons';
import {FlatList} from 'react-native';
import {useCategory} from '@/store/category';
import {SaleCodeItem} from '@/screens/Home/screens/Code/components/SaleCodeItem';
import {BaseStyles} from '@/themes/BaseStyles';

interface ListCouponInterface {
  id: string;
  index?: number;
  onPress?: () => void;
}

export const ListCouponByCategories = memo(function ListCouponByCategories({
  onPress,
  id,
}: ListCouponInterface) {
  const categories = useCategory(id);

  const allCoupon = getAllCoupons(parseInt(id));

  const renderItem = useCallback(({item}: {item: string}) => {
    // @ts-ignore
    return <SaleCodeItem id={item} />;
  }, []);
  return (
    <Container>
      <STextCategories>Voucher {categories?.name}</STextCategories>
      <FlatList
        data={allCoupon}
        numColumns={2}
        renderItem={renderItem}
        contentContainerStyle={[BaseStyles.mt16, BaseStyles.mb20]}
      />
    </Container>
  );
});

const Container = styled(ScreenWrapper)`
  background-color: ${Colors.yellowBlur};
`;

const STextCategories = styled(Regular)`
  background-color: ${Colors.orange1};
  text-align: center;
  margin: 10px auto 0;
  padding: 10px;
  color: ${Colors.backgroundColor};
  border-radius: 6px;
  overflow: hidden;
`;
