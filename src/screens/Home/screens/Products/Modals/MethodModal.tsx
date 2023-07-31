import React, {memo, useCallback} from 'react';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {MethodItem} from '../../../components/MethodItem';
import ScreenWrapper, {ScreenScrollWrapper} from '@/components/ScreenWrapper';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestPaymentList} from '@/store/payment/functions';
import {usePaymentByQuery} from '@/store/payment';
import useAutoToastError from '@/hooks/useAutoToastError';
import {goBack} from '@/utils/navigation';
import {useNavigationParams} from '@/hooks/useNavigationParams';

export interface MethodModalInterface {
  onPressTitle: (title: string) => void;
}

export const MethodModal = memo(function MethodModal() {
  const {onPressTitle} = useNavigationParams<MethodModalInterface>();
  const paymentMethod = usePaymentByQuery('all');

  const {loading, error, call} = useAsyncEffect(async () => {
    return await requestPaymentList();
  });

  useAutoToastError(error);

  const onSelect = useCallback(
    (value: string) => {
      onPressTitle && onPressTitle(value);
      goBack();
    },
    [onPressTitle],
  );

  return (
    <ScreenWrapper>
      <DynamicHeader title="Chọn hình thức thanh toán" />
      <ScreenScrollWrapper>
        {paymentMethod.map((item, index) => {
          // @ts-ignore
          return (
            <MethodItem
              key={item}
              id={item}
              index={index}
              onPress={() => onSelect(item)}
            />
          );
        })}
      </ScreenScrollWrapper>
    </ScreenWrapper>
  );
});

export default MethodModal;
