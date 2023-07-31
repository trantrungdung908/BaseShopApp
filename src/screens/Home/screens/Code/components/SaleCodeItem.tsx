import React, {memo, useMemo} from 'react';
import {styled} from '@/global';
import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import {useCoupons} from '@/store/coupons';
import {IMG_COUPON_SALE} from '@/assets';
import {useAttributes} from '@/store/attributes';
import {StyleSheet, View} from 'react-native';

export interface SaleCodeItemInterface {
  id: string;
  onPress?: () => void;
}

// @ts-ignore
export const SaleCodeItem = memo(function SaleCodeItem({
  onPress,
  id,
}: SaleCodeItemInterface) {
  const saleCodeIds = useCoupons(id.toString());
  const brands = useAttributes(saleCodeIds?.product_ids[0]);

  const title = useMemo(() => {
    if (saleCodeIds) {
      return saleCodeIds.discount_type === 'percent'
        ? `Giảm giá: ${saleCodeIds.amount}%`
        : `Giảm tối đa ${saleCodeIds.amount}đ`;
    }
    return '';
  }, [saleCodeIds]);

  if (!saleCodeIds) {
    return;
  }
  return (
    <STouchCode key={saleCodeIds.id}>
      {/*<SImage source={IMG_COUPON_SALE} />*/}
      <WrapText>
        <STextBrand numberOfLines={2}>{brands?.name}</STextBrand>
      </WrapText>
      <ContentView>
        <STextCode numberOfLines={1}>{saleCodeIds.code}</STextCode>
        <STextAmount numberOfLines={1}>{title}</STextAmount>
        <STouchSave>
          <STextSave>Lưu</STextSave>
        </STouchSave>
        <STouch>
          <STextCondition>Điều kiện</STextCondition>
        </STouch>
      </ContentView>
      <View style={styles.border} />
      <View style={[styles.border, {top: 20}]} />
      <View style={[styles.border, {top: 35}]} />
      <View style={[styles.border, {top: 50}]} />
      <View style={[styles.border, {top: 65}]} />
      <View style={[styles.border, {top: 80}]} />
      <View style={[styles.border, {top: 95}]} />
    </STouchCode>
  );
});

const STouchCode = styled.TouchableOpacity`
  background-color: ${Colors.white};
  border-radius: 4px;
  margin: 4px;
  flex-direction: row;
  width: ${scale(180)}px;
`;

const ContentView = styled.View`
  padding: 12px 10px;
`;

const STextCode = styled(Regular)`
  font-size: 16px;
  color: ${Colors.gray1};
`;

const STextAmount = styled(Regular)`
  width: ${scale(100)}px;
  margin: 8px 0;
  font-size: 12px;
  color: ${Colors.gray3};
`;

const STouchSave = styled.TouchableOpacity`
  background-color: ${Colors.orange1};
`;

const STextSave = styled(Regular)`
  font-size: 14px;
  color: ${Colors.backgroundColor};
  padding: 3px;
  text-align: center;
`;

const STouch = styled.TouchableOpacity``;

const STextCondition = styled(Medium)`
  font-size: 12px;
  color: ${Colors.blue};
  align-self: flex-end;
  padding: 6px 2px;
`;

const STextBrand = styled(Regular)`
  width: ${scale(60)}px;
  color: ${Colors.gray1};
  font-size: 14px;
  align-self: center;
  padding-left: 7px;
  text-align: center;
`;

const WrapText = styled.View`
  justify-content: center;
  border-right-width: 1px;
  border-right-color: ${Colors.gray4};
`;

const styles = StyleSheet.create({
  border: {
    width: 10,
    height: 10,
    position: 'absolute',
    top: 5,
    left: -5,
    borderRadius: 10,
    backgroundColor: Colors.yellowBlur,
  },
  dash: {
    width: 1,
    height: 10,
    position: 'absolute',
    right: -3,
    backgroundColor: Colors.gray4,
  },
});
