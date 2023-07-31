import React, {memo, useMemo} from 'react';
import {styled} from '@/global';
import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import DynamicCheckbox from '../../../../../components/Checkbox/DynamicCheckbox';
import {VoucherItemsInterface} from '@/screens/Home/components/dummydata';
import {Platform, StyleSheet, View} from 'react-native';
import {useCoupons} from '@/store/coupons';
import {useAttributes} from '@/store/attributes';
import {useCategory} from '@/store/category';

export interface VoucherItemProps {
  onPress?: () => void;
  id: string;
}

export const VoucherItem = memo(function Voucher({
  onPress,
  id,
}: VoucherItemProps) {
  const vouchers = useCoupons(id);
  const categories = useCategory(vouchers?.product_categories[0]);

  const title = useMemo(() => {
    if (vouchers) {
      return vouchers.discount_type === 'percent'
        ? `Giảm giá: ${vouchers.amount}%`
        : `Giảm tối đa ${vouchers.amount}đ`;
    }
    return '';
  }, [vouchers]);
  if (!vouchers) {
    return null;
  }
  return (
    <STouchCode key={vouchers.id}>
      <WrapText>
        <STextBrand numberOfLines={2}>{categories?.name}</STextBrand>
      </WrapText>
      <ContentView>
        <Info>
          <STextCode numberOfLines={1}>{vouchers.code}</STextCode>
          <STextAmount numberOfLines={1}>{title}</STextAmount>
        </Info>
        <STouchSave>
          <STextSave>Lưu</STextSave>
        </STouchSave>
      </ContentView>
    </STouchCode>
  );
});

const STouchCode = styled.TouchableOpacity`
  background-color: ${Colors.white};
  border: 1px solid ${Colors.gray7};
  border-radius: 4px;
  flex-direction: row;
  margin: 6px 12px;
  min-height: ${scale(100)}px;
`;

const ContentView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-right: 12px;
`;

const Info = styled.View`
  flex: 1;
  padding: 12px;
`;

const STextCode = styled(Regular)`
  font-size: 16px;
  color: ${Colors.gray1};
`;

const STextAmount = styled(Regular)`
  font-size: 12px;
  color: ${Colors.gray3};
  margin-top: 4px;
`;

const STouchSave = styled.TouchableOpacity`
  background-color: ${Colors.orange1};
  margin-left: auto;
  text-align: center;
  padding: 6px 12px;
`;

const STextSave = styled(Regular)`
  font-size: 14px;
  color: ${Colors.backgroundColor};
`;

const STextBrand = styled(Regular)`
  width: ${scale(80)}px;
  color: ${Colors.gray1};
  font-size: 14px;
  text-align: center;
`;

const WrapText = styled.View`
  justify-content: center;
  border-right-width: 1px;
  border-right-color: ${Colors.gray7};
`;

const styles = StyleSheet.create({
  dash: {
    width: 1,
    height: 10,
    position: 'absolute',
    right: -3,
    backgroundColor: Colors.gray4,
  },
});
