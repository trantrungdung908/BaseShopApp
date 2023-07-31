import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import React, {memo, useCallback, useMemo} from 'react';
import styled from 'styled-components/native';
import {useCoupons} from '@/store/coupons';
import {IMG_COUPON_SALE} from '@/assets';
import {DynamicCheckbox} from '@/components/Checkbox';
import {getCartByQuery} from '@/store/cart';
import {dateStringToTimestamp, getDateFormat} from '@/services/FormatDate';
import {Platform} from 'react-native';

interface CouponItemInterface {
  id: string;
  cartIds: string[];
  onSelected?: (value: string) => void;
  index: number;
  price: string;
}

export const CouponItem = memo(function CouponItem({
  id,
  cartIds,
  onSelected,
  price,
}: CouponItemInterface) {
  const coupon = useCoupons(id);
  const code = getCartByQuery('coupons');
  const title = useMemo(() => {
    if (coupon) {
      return coupon.discount_type === 'percent'
        ? `Giảm giá ${coupon.amount}%`
        : `Giảm tối đa ${parseInt(coupon?.amount).toLocaleString('en')}đ`;
    }
  }, [coupon]);

  const titleFreeShip = useMemo(() => {
    return coupon?.free_shipping
      ? 'Freeship sản phẩm'
      : 'Không áp dụng freeship';
  }, [coupon?.free_shipping]);

  const isCoupon = useMemo(() => {
    if (!coupon) {
      return false;
    }
    if (coupon.product_ids.length === 0) {
      return true;
    }
    return (
      coupon.product_ids.length > 0 &&
      cartIds.some(item => coupon.product_ids.includes(item))
    );
  }, [cartIds, coupon]);

  const isSelected = useMemo(() => {
    // @ts-ignore
    return code[0]?.code === coupon?.code;
  }, [code, coupon?.code]);

  const onSetCode = useCallback(() => {
    onSelected?.(coupon?.code || '');
  }, [coupon?.code, onSelected]);

  if (!coupon) {
    return null;
  }
  return (
    <STouch
      onPress={onSetCode}
      disabled={parseInt(coupon.minimum_amount) >= parseInt(price)}>
      <WrapImage>
        <SImage source={IMG_COUPON_SALE} />
        {coupon.usage_limit && <TextAmount>Số lượng có hạn</TextAmount>}
        {coupon.usage_limit && <STriangle />}
      </WrapImage>
      <ViewInfo>
        <TextTitle>{title}</TextTitle>
        {coupon.description !== '' && (
          <TitleMinimum numberOfLines={2}>{coupon.description}</TitleMinimum>
        )}
        {coupon.date_expires !== null && (
          <TitleLimit>
            HSD:{' '}
            {getDateFormat(
              dateStringToTimestamp(coupon?.date_expires || '1', 'YYYY-MM-DD'),
              'DD/MM/YYYY',
            )}
          </TitleLimit>
        )}
        <TitleFreeShip>{titleFreeShip}</TitleFreeShip>
      </ViewInfo>

      <WrapCheckBox>
        <DynamicCheckbox
          value={isSelected}
          onPress={onSetCode}
          disabled={parseInt(coupon.minimum_amount) > parseInt(price)}
        />
      </WrapCheckBox>
      {parseInt(coupon.minimum_amount) > parseInt(price) && <ViewBlur />}
    </STouch>
  );
});

const TitleFreeShip = styled(Regular)`
  font-size: 12px;
  color: ${Colors.red1};
  margin-top: 6px;
`;

const TitleMinimum = styled(Regular)`
  font-size: 14px;
  color: ${Colors.gray1};
`;

const TitleLimit = styled(Regular)`
  font-size: 12px;
  color: ${Colors.gray4};
  margin-top: 6px;
`;

const STouch = styled.TouchableOpacity`
  flex-direction: row;
  margin: 6px 0;
  border-width: 1px;
  border-color: ${Colors.gray7};
  border-radius: 4px;
  height: ${scale(100)}px;
  background-color: ${Colors.backgroundColor};
`;

const WrapImage = styled.View``;

const SImage = styled.Image`
  height: 100%;
  width: ${scale(100)}px;
`;

const TextAmount = styled(Regular)`
  color: ${Colors.backgroundColor};
  font-size: 12px;
  position: absolute;
  background-color: ${Colors.orange1};
  left: -8px;
  top: 5px;
  padding: 2px;
  border-radius: 3px;
`;

const STriangle = styled.View`
  border-top-color: ${Colors.orange1};
  border-top-width: 5px;
  border-left-width: 5px;
  border-left-color: transparent;
  position: absolute;
  left: ${Platform.OS === 'ios' ? -8 : -7}px;
  top: ${Platform.OS === 'ios' ? 22 : 24}px;
`;

const ViewInfo = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: 12px;
`;

const TextTitle = styled(Medium)`
  font-size: 18px;
  line-height: ${scale(24)}px;
  color: ${Colors.gray1};
`;

const WrapCheckBox = styled.View`
  align-self: center;
  margin-right: 8px;
`;

const ViewBlur = styled.View`
  z-index: 1;
  position: absolute;
  background-color: ${Colors.gray7};
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
`;
