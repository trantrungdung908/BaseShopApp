import {
  IC_ARROW_RIGHT,
  IC_COUPON,
  IC_DELETE,
  IC_MINUS,
  IC_PLUS_CART,
} from '@/assets';
import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';
import React, {memo, useCallback, useMemo} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from 'react-native';
import styled from 'styled-components/native';
import {getCartByQuery, ParamCartItemInterface, useCart} from '@/store/cart';
import FastImage from 'react-native-fast-image';
import {
  requestPostItemCart,
  requestRemoveItemCart,
} from '@/store/cart/functions';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import useAutoToastError from '@/hooks/useAutoToastError';
import AlertWithCustom from '@/components/Modals/AlertWithCustom';
import useBoolean from '@/hooks/useBoolean';
import Modal from 'react-native-modal';
import {Divider} from '@/components/Views/Divider';
import {navigateToVoucherBrandModal} from '@/utils/navigation';
import {useProduct} from '@/store/product';
import {getAllCoupons} from '@/store/coupons';
import {useAttributesByQuery} from '@/store/attributes';

interface CartItemInterface {
  item: number;
  onPress: () => void;
}

export const CartItem = memo(function CartItem({
  item,
  onPress,
}: CartItemInterface) {
  const [visible, show, hide] = useBoolean(false);
  const cart = useCart((item || 0).toString());
  const nonce = getCartByQuery('nonce');
  const products = useProduct(cart?.id.toString() || '');
  const getCoupons = getAllCoupons(products ? products.categories[0].id : 0);
  const [{error, loading}, updateItem] = useAsyncFn(
    async (params: ParamCartItemInterface) => {
      await requestPostItemCart(params, nonce);
    },
    [nonce],
  );

  const [{error: errRemove, loading: loadingRemove}, removeItem] =
    useAsyncFn(async () => {
      await requestRemoveItemCart({key: cart?.key || ''}, nonce);
    }, []);

  const onAddCart = useCallback(async () => {
    await updateItem({
      key: cart?.key || '',
      quantity: (cart?.quantity || 0) + 1,
    });
  }, [cart?.key, cart?.quantity, updateItem]);

  const onDecreaseCart = useCallback(async () => {
    if (cart?.quantity === 1) {
      return show();
    }
    await updateItem({
      key: cart?.key || '',
      quantity: (cart?.quantity || 0) - 1,
    });
  }, [cart?.key, cart?.quantity, show, updateItem]);

  const cartName = useMemo(() => {
    if (cart) {
      if (cart.variation && cart.variation.length > 0) {
        return (
          // eslint-disable-next-line @typescript-eslint/no-shadow
          cart.name + '- ' + cart.variation.map(item => item.value).join(', ')
        );
      }
      return cart.name;
    }
    return '';
  }, [cart]);

  useAutoToastError(error);
  useAutoToastError(errRemove);

  if (!cart) {
    return null;
  }

  return (
    <>
      <STouchCart onPress={onPress}>
        <SImage source={{uri: cart.images[0].src}} />
        <ContentView>
          <TextName numberOfLines={1}>{cartName}</TextName>
          <TextPrice>
            {parseInt(cart.prices.price).toLocaleString('en')}đ
          </TextPrice>
          <WrapAction>
            <STouch onPress={onDecreaseCart}>
              <Image source={IC_MINUS} />
            </STouch>
            <ViewLine>
              <TextQuantity>{cart.quantity}</TextQuantity>
            </ViewLine>
            <STouch onPress={onAddCart}>
              <Image source={IC_PLUS_CART} />
            </STouch>
          </WrapAction>
        </ContentView>
        <STouchDelete onPress={removeItem}>
          <Image source={IC_DELETE} />
        </STouchDelete>
        <AlertWithCustom
          name={'Thông báo'}
          visible={visible}
          hide={hide}
          title={'Bạn có muốn bỏ sản phẩm này không?'}
          onPress={() => {}}
          onPressCancel={removeItem}
        />
        <Modal
          isVisible={loadingRemove || loading}
          hideModalContentWhileAnimating={true}
          useNativeDriver={true}
          animationIn={'zoomIn'}
          animationOut={'zoomOut'}
          onBackButtonPress={hide}
          onBackdropPress={hide}
          backdropColor={Colors.backgroundColor}
          style={styles.modal}>
          <ActivityIndicator size="large" color={Colors.orange1} />
        </Modal>
      </STouchCart>
      <TouchVoucher
        onPress={() => navigateToVoucherBrandModal({couponIds: getCoupons})}>
        <SIcon source={IC_COUPON} />
        <TextVoucher>Voucher Product</TextVoucher>
        <SArrow source={IC_ARROW_RIGHT} />
      </TouchVoucher>
      <Divider height={8} />
    </>
  );
});

const STouch = styled.TouchableOpacity`
  border: 1px solid ${Colors.gray3};
  border-radius: 50px;
  padding: 5px;
`;

const STouchCart = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px;
`;

const ContentView = styled.View`
  flex: 1;
  margin-left: 16px;
`;

const SImage = styled(FastImage)`
  width: ${scale(80)}px;
  height: ${scale(80)}px;
  border-radius: 5px;
  margin-left: 6px;
`;

const TextName = styled(Medium)`
  font-size: 16px;
  color: ${Colors.gray1};
`;

const TextPrice = styled(Medium)`
  font-size: 16px;
  line-height: 24px;
  color: ${Colors.orange1};
  margin: 12px 0;
`;

const TextQuantity = styled(Regular)`
  font-size: 16px;
  color: ${Colors.gray1};
  margin: 0 12px;
`;

const WrapAction = styled.View`
  flex-direction: row;
`;

const STouchDelete = styled(STouch)`
  margin-right: 15px;
  align-self: flex-end;
`;

const ViewLine = styled.View`
  border-bottom-color: ${Colors.gray7};
  border-bottom-width: 1px;
`;

const TouchVoucher = styled.TouchableOpacity`
  padding: 12px;
  flex-direction: row;
  align-items: center;
  border-top-width: 1px;
  border-top-color: ${Colors.gray7};
`;

const SIcon = styled.Image`
  width: 25px;
  height: 25px;
`;

const TextVoucher = styled(TextName)`
  margin-left: 12px;
`;

const SArrow = styled.Image`
  margin-left: auto;
`;

const ViewProductOther = styled.View`
  background-color: ${Colors.gray7};
`;

const WrapTitle = styled.View`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin-top: 12px;
`;

const Line = styled.View`
  width: 60px;
  height: 1px;
  background-color: ${Colors.gray4};
`;

const TextOther = styled(Medium)`
  text-align: center;
  color: ${Colors.gray1};
  font-size: 16px;
  margin: 0 12px;
`;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    zIndex: 1,
  },
});
