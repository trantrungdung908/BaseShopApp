import React, {memo, useCallback, useMemo, useState} from 'react';
import {ModalProps} from 'react-native-modal';
import {BottomMenuModal} from '@/components/BottomMenu';
import {styled} from '@/global';
import {Bold, Regular} from '@/components/CommonStyled';
import {scale} from '@/utils/scale';
import {Colors} from '@/themes';
import FastImage from 'react-native-fast-image';
import {useProductByQuery} from '@/store/product';
import {DynamicChangeQuantity} from '@/components/Checkbox/DynamicChangeQuantity';
import {ParamAddItemInterface} from '@/store/cart';
import {RoundedButton} from '@/screens/Login/components/RoundedButton';
import {unique} from '@/utils/constants';
import ToastService from '@/services/ToastService';

export interface BottomBuyModalInterface extends Partial<ModalProps> {
  name: string;
  image?: string;
  price?: string;
  onClose: () => void;
  params: ParamAddItemInterface;
  onChange?: (value: ParamAddItemInterface) => void;
  isVisible: boolean;
}

export const BottomBuyModal = memo(function ({
  isVisible,
  name,
  image,
  onClose,
  price,
  params,
  onChange,
}: BottomBuyModalInterface) {
  const variations = useProductByQuery('variations');
  const [subParams, setSubParams] = useState<ParamAddItemInterface>(params);

  const onChangeQuantity = useCallback(
    (value: number) => {
      setSubParams(Object.assign({}, subParams, {quantity: value}));
    },
    [subParams],
  );

  const colors = useMemo(() => {
    if (variations.length > 0) {
      return variations
        .map((item: {option: string}) => item.option)
        .filter(unique);
    }
    return [];
  }, [variations]);

  const sizes = useMemo(() => {
    if (variations.length > 0) {
      return variations.map((item: {size: string}) => item.size).filter(unique);
    }
    return [];
  }, [variations]);

  const onSetColor = useCallback(
    (color: string) => {
      const result = [
        {attribute: 'Color', value: color},
        {
          attribute: 'Size',
          value: (subParams?.variation || [])[1]?.value || '',
        },
      ];
      setSubParams(
        Object.assign({}, subParams, {
          variation: result,
        }),
      );
    },
    [subParams],
  );

  const onSetSize = useCallback(
    (size: string) => {
      const result = [
        {
          attribute: 'Color',
          value: (subParams?.variation || [])[0]?.value || '',
        },
        {
          attribute: 'Size',
          value: size,
        },
      ];
      setSubParams(
        Object.assign({}, subParams, {
          variation: result,
        }),
      );
    },
    [subParams],
  );

  const filterSizeByColor = useMemo(() => {
    if (variations.length > 0) {
      return variations
        .map((item: {option: string; size: any}) => {
          if (
            item.option.toLowerCase() ===
              (subParams?.variation || [])[0]?.value ||
            ''
          ) {
            return item.size;
          }
        })
        .filter(Boolean);
    }
    return [];
  }, [subParams.variation, variations]);

  const filterColorBySize = useMemo(() => {
    if (variations.length > 0) {
      return variations
        .map((item: {option: string; size: any}) => {
          if (
            item.size.toLowerCase() ===
              (subParams?.variation || [])[1]?.value ||
            ''
          ) {
            return item.option;
          }
        })
        .filter(Boolean);
    }
    return [];
  }, [subParams.variation, variations]);

  const isColor = useMemo(() => {
    if (variations.length > 0) {
      return variations.every((item: {option: string}) => item.option);
    }
    return false;
  }, [variations]);

  const isSize = useMemo(() => {
    if (variations.length > 0) {
      return variations.every((item: {size: string}) => item.size);
    }
    return false;
  }, [variations]);

  const onSubmit = useCallback(() => {
    if (isColor && isSize) {
      return (subParams?.variation || []).every(item => item.value !== '')
        ? onChange?.(subParams)
        : ToastService.showError('Phải cập nhật đầy đủ thông tin!');
    }
    if (isColor) {
      return (subParams?.variation || [])[0]
        ? onChange?.(subParams)
        : ToastService.showError('Phải cập nhật đầy đủ thông tin!');
    }
    if (isSize) {
      return (subParams?.variation || [])[1]
        ? onChange?.(subParams)
        : ToastService.showError('Phải cập nhật đầy đủ thông tin!');
    }
    return onChange?.(subParams);
  }, [isColor, isSize, onChange, subParams]);

  return (
    <BottomMenuModal isVisible={isVisible} onClose={onClose}>
      <Container>
        <ContainerProduct>
          <SImage source={{uri: image}} />
          <Content>
            <STitle numberOfLines={2}>{name}</STitle>
            <TitlePrice>{price}</TitlePrice>
            <DynamicChangeQuantity
              value={subParams.quantity}
              onChangeValue={onChangeQuantity}
            />
          </Content>
        </ContainerProduct>
        {isColor && (
          <WrapView>
            <Title>{'Màu sắc:'}</Title>
            {colors.map((item: string, index: number) => {
              const disabled =
                filterColorBySize.length === 0
                  ? false
                  : !filterColorBySize.some((size: string) => size === item);
              return (
                <STouch
                  key={index}
                  disabled={disabled}
                  isSelected={
                    subParams.variation
                      ? (subParams?.variation[0] || []).value === item
                      : false
                  }
                  onPress={() => onSetColor(item)}>
                  <ViewColor color={item?.toLowerCase()} />
                </STouch>
              );
            })}
          </WrapView>
        )}
        {isSize && (
          <WrapView>
            <Title>{'Kích cỡ:'}</Title>
            {sizes.map((item: string, index: number) => {
              const disabled =
                filterSizeByColor.length === 0
                  ? false
                  : !filterSizeByColor.some((size: string) => size === item);
              return (
                <STouchSize
                  key={index}
                  disabled={disabled}
                  isSelected={
                    subParams.variation
                      ? (subParams?.variation[1] || []).value === item
                      : false
                  }
                  onPress={() => onSetSize(item)}>
                  <STitle disabled={disabled}>{item}</STitle>
                </STouchSize>
              );
            })}
          </WrapView>
        )}
        <SRoundedButton onPress={onSubmit}>
          <Title>{'Thêm vào giỏ hàng'}</Title>
        </SRoundedButton>
      </Container>
    </BottomMenuModal>
  );
});

const SRoundedButton = styled(RoundedButton)`
  margin-top: ${scale(40)}px;
  background-color: ${Colors.orange1};
  flex-direction: row;
`;

const Title = styled(Regular)`
  font-size: 14px;
`;

const ViewColor = styled.View<{color?: string}>`
  padding: 16px;
  margin: 12px;
  border-radius: 30px;
  background-color: ${props =>
    // @ts-ignore
    props.color ? Colors[props.color] : Colors.backgroundColor};
`;

const STouch = styled.TouchableOpacity<{
  isSelected?: boolean;
}>`
  flex-direction: row;
  justify-content: space-between;
  border-bottom-width: 1px;

  border-color: ${props => (props.isSelected ? Colors.gray5 : 'transparent')};
`;

const STouchSize = styled(STouch)`
  width: 32px;
  height: 32px;
  border-radius: 32px;
  margin-left: 12px;
  align-items: center;
  justify-content: center;
  background-color: ${props =>
    props.isSelected ? Colors.orange1 : 'transparent'};
`;

const WrapView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
`;

const STitle = styled(Bold)<{disabled?: boolean}>`
  font-size: 18px;
  line-height: ${scale(20)}px;
  color: ${props => (props.disabled ? Colors.gray5 : Colors.gray1)};
  max-width: ${scale(220)}px;
`;

const TitlePrice = styled(STitle)`
  color: ${Colors.orange1};
  margin-bottom: 8px;
`;

const ContainerProduct = styled.View`
  flex-direction: row;
`;

const Content = styled.View`
  margin-left: 8px;
`;

const SImage = styled(FastImage)`
  width: 80px;
  height: 70px;
  border-radius: 20px;
  border-width: 1px;
  border-color: ${Colors.gray7};
`;

const Container = styled.View`
  min-height: 120px;
  background-color: ${Colors.white};
  width: 100%;
  border-radius: 20px;
  padding: 20px 16px;
`;
