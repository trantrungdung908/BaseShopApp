import React, {memo, useCallback} from 'react';

import {DynamicHeader} from '@/components/Header/DynamicHeader';
import ScreenWrapper from '@/components/ScreenWrapper';
import {FlatList, StyleSheet} from 'react-native';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {styled} from '@/global';
import SubmitButtonColor from '@/components/Buttons/SubmitButtonColor';
import {VoucherItem} from '@/screens/Home/screens/VoucherScreen/components/VoucherItem';
import {goBack} from '@/utils/navigation';

export interface VoucherBrandModalInterface {
  couponIds: string[];
}

export const VoucherBrandModal = memo(function VoucherBrandModal() {
  const {couponIds} = useNavigationParams<VoucherBrandModalInterface>();

  const renderItem = useCallback(
    ({item, index}: {item: string; index: number}) => {
      return <VoucherItem id={item} />;
    },
    [],
  );

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Voucher Shop'} />
      <FlatList
        data={couponIds}
        showsVerticalScrollIndicator={false}
        renderItem={renderItem}
      />

      <SRoundedButton
        onPress={() => {
          goBack();
        }}
        disabled={false}
        title={'Đồng ý'}
        loading={false}
        textStyle={styles.submitText}
      />
    </ScreenWrapper>
  );
});

const SRoundedButton = styled(SubmitButtonColor)`
  padding: 0 16px;
  margin-bottom: 32px;
  border-radius: 2px;
`;

const styles = StyleSheet.create({
  submitText: {
    fontSize: 16,
  },
});
export default VoucherBrandModal;
