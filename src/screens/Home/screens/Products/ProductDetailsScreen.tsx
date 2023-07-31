import React, {memo, useCallback, useMemo, useRef, useState} from 'react';
import {styled} from '@/global';
import {
  IC_BUY,
  IC_FACEBOOK,
  IC_FLASH_SALE,
  IC_HEART,
  IC_HOT,
  IC_LINKEDIN,
  IC_NO_REVIEWS,
  IC_SHARE_SOCIAL,
  IC_STAR,
  IC_STAR_FILL,
  IC_TWITTER,
} from '@/assets';
import {Colors} from '@/themes';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  ScrollView,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native';
import {
  navigateToReviewsModal,
  pushToCartScreen,
  pushToProductDetailsScreen,
} from '@/utils/navigation';
import {Bold, Medium, Regular} from '@/components/CommonStyled';
import {scale} from '@/utils/scale';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {useProduct, useProductByQuery} from '@/store/product';
import {HTMLRenderer} from '@/components/Views/HTMLRender';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import ScreenWrapper, {ScreenScrollWrapper} from '@/components/ScreenWrapper';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import {requestAddItemCart} from '@/store/cart/functions';
import {
  getCartByQuery,
  ParamAddItemInterface,
  useCartByQuery,
} from '@/store/cart';
import useAutoToastError from '@/hooks/useAutoToastError';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {
  requestProductByIds,
  requestProductsByCategory,
  requestProductVariations,
} from '@/store/product/functions';
import {Divider} from '@/components/Views/Divider';
import {getProductsByReviews} from '@/store/reviews';
import {Posts} from '@/components/Post';
import {RawPostInterface} from '@/components/Post/types';
import {dateStringToTimestamp} from '@/services/FormatDate';
import {requestProductReviews} from '@/store/reviews/functions';
import {BottomBuyModal} from '@/screens/Home/screens/Products/Modals/BottomBuyModal';
import useBoolean from '@/hooks/useBoolean';
import {BaseRefreshControl} from '@/components/Common/BaseRefreshControl';
import {shareFacebook} from '@/utils/files';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from 'react-native-popup-menu';
import LoaderRender from '@/components/Views/LoaderRender';
import FastImage from 'react-native-fast-image';
import {RelatedItem} from '@/screens/Home/screens/Products/components/RelatedItem';
import {ProductItem} from '@/screens/Home/screens/Products/components/ProductItem';
import {removeDesc} from '@/utils/string';
import {CountDownComponent} from '@/components/Common/CountDownComponent';

export interface DetailsProductInterface {
  idProduct: number;
}

export const ProductDetailsScreen = memo(function ProductDetailsScreen() {
  const {idProduct} = useNavigationParams<DetailsProductInterface>();
  const scrollView = useRef<ScrollView>(null);
  const nonce = getCartByQuery('nonce');
  const itemsCount = useCartByQuery('all');
  const reviews = getProductsByReviews(idProduct);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isVisible, show, hide] = useBoolean(false);
  const animationValue = useRef(new Animated.Value(0)).current;

  const [params, setParams] = useState<ParamAddItemInterface>({
    quantity: 1,
    id: idProduct,
  });

  const {loading, call, value} = useAsyncEffect(async () => {
    await requestProductVariations(idProduct);
    return await requestProductByIds(idProduct);
  });

  const detailsProducts = useProduct(
    value?.parent_id
      ? (value?.parent_id || '').toString()
      : idProduct.toString(),
  );

  const anotherProducts = useProductByQuery(
    detailsProducts?.categories[0].id.toString(),
  );

  const {call: callReviews} = useAsyncEffect(async () => {
    await requestProductsByCategory({
      page: 1,
      per_page: 10,
      category: detailsProducts?.categories[0].id.toString(),
    });
    await requestProductReviews({page: 1, per_page: 100});
  }, []);

  const onNavigateModalReview = useCallback(() => {
    navigateToReviewsModal({idProduct, callReviews});
  }, [callReviews, idProduct]);

  const onPushToCart = useCallback(() => {
    pushToCartScreen();
  }, []);

  const [{loading: loadingCart, error}, addCart] = useAsyncFn(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    async (value?: ParamAddItemInterface) => {
      hide();
      await requestAddItemCart(value || params, nonce);
      onPushToCart();
    },
    [params],
  );

  const onSubmit = useCallback(
    // eslint-disable-next-line @typescript-eslint/no-shadow
    async (value: ParamAddItemInterface) => {
      setParams(value);
      await addCart(value);
    },
    [addCart],
  );

  const Post = useMemo((): RawPostInterface[] => {
    if (reviews) {
      // @ts-ignore
      return reviews.map(item => ({
        hid: '1',
        gid: 1,
        metatype: 'system',
        title: item?.review || '',
        type: 'post',
        content: item?.review || '',
        liked: 2,
        token: '3232323',
        gavatar: item?.reviewer_avatar_urls['96'],
        attachment: null,
        username: item?.reviewer || '',
        user_id: '1',
        id: item?.id || '',
        since: dateStringToTimestamp(
          item?.date_created || '1',
          'YYYY-MM-DDThh:mm:ss',
        ),
        reactions: [],
        star_fill: Array.from(Array(item?.rating).keys()),
        star: Array.from(Array(5 - (item?.rating || 0)).keys()),
      }));
    }
    return [];
  }, [reviews]);

  const titleBrand = useMemo(() => {
    if (detailsProducts?.attributes.length > 0) {
      return detailsProducts?.attributes.filter(item => item.id === 2)[0]
        .options[0];
    }
    return '';
  }, [detailsProducts]);

  const handleScroll = useCallback(
    (e: {nativeEvent: {contentOffset: {x: any}}}) => {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
      // eslint-disable-next-line @typescript-eslint/no-shadow
      const currentIndex = Math.round(
        contentOffsetX / Dimensions.get('window').width,
      );
      setCurrentIndex(currentIndex);
    },
    [],
  );

  const handleImage = useCallback((index: number) => {
    scrollView.current?.scrollTo({
      x: index * Dimensions.get('window').width,
      y: 0,
      animated: true,
    });
  }, []);

  const percentSale = useMemo(() => {
    return Math.round(
      100 -
        (parseInt(detailsProducts?.price || '') /
          parseInt(detailsProducts?.regular_price || '')) *
          100,
    );
  }, [detailsProducts?.price, detailsProducts?.regular_price]);

  const backgroundInterpolate = animationValue.interpolate({
    inputRange: [0, 10],
    outputRange: ['transparent', Colors.backgroundColor],
  });

  const backgroundStyle = {
    backgroundColor: backgroundInterpolate,
  };

  const renderAnotherProduct = useCallback(
    // @ts-ignore
    ({item}) => {
      return (
        <ProductItem
          item={item}
          onPress={() => pushToProductDetailsScreen({idProduct: item})}
        />
      );
    },
    [],
  );

  useAutoToastError(error);

  const [{error: errorFb}, onSelectedOption] = useAsyncFn(async () => {
    return await shareFacebook(detailsProducts?.permalink || '');
  }, []);

  const renderItem = useCallback(({item}: {item: number}) => {
    return (
      <RelatedItem
        id={item}
        onPress={() => pushToProductDetailsScreen({idProduct: item})}
      />
    );
  }, []);

  if (!detailsProducts) {
    return <SLoad />;
  }

  return (
    <ScreenWrapper>
      <Animated.View style={[styles.viewHeader, backgroundStyle]}>
        <DynamicHeader title={''} style={styles.backgroundHeader}>
          <WrapBanner>
            <OptionSelector>
              <Menu>
                <MenuTrigger customStyles={triggerStyles}>
                  <ShareIcon source={IC_SHARE_SOCIAL} />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                  <OptionMenu>
                    <MenuOption
                      customStyles={optionStyles}
                      onSelect={onSelectedOption}>
                      <OptionMenuItemIcon source={IC_FACEBOOK} />
                      <OptionMenuItemTitle>{'Facebook'}</OptionMenuItemTitle>
                    </MenuOption>
                    <MenuOption customStyles={optionStyles}>
                      <OptionMenuItemIcon source={IC_LINKEDIN} />
                      <OptionMenuItemTitle>{'LinkedIn'}</OptionMenuItemTitle>
                    </MenuOption>
                    <MenuOption customStyles={optionStyles}>
                      <OptionMenuItemIcon source={IC_TWITTER} />
                      <OptionMenuItemTitle>{'Twitter'}</OptionMenuItemTitle>
                    </MenuOption>
                  </OptionMenu>
                </MenuOptions>
              </Menu>
            </OptionSelector>
            <STouchInfo onPress={onPushToCart}>
              <SIcon source={IC_BUY} />
              {itemsCount.length > 0 ? (
                <ViewAmount>
                  <SAmount>{itemsCount.length}</SAmount>
                </ViewAmount>
              ) : (
                ''
              )}
            </STouchInfo>
          </WrapBanner>
        </DynamicHeader>
      </Animated.View>

      <ScreenScrollWrapper
        refreshControl={
          <BaseRefreshControl refreshing={loading} onRefresh={call} />
        }
        onScroll={e => {
          const offsetY = e.nativeEvent.contentOffset.y;
          animationValue.setValue(offsetY);
        }}
        scrollEventThrottle={16}>
        <View>
          <ScrollView
            ref={scrollView}
            onScroll={handleScroll}
            pagingEnabled
            scrollEventThrottle={16}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {detailsProducts.images.map((item, index) => {
              return (
                <View style={styles.maxWeight} key={index}>
                  <SImage
                    source={{uri: item.src}}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                </View>
              );
            })}
          </ScrollView>
          <WrapText>
            <SRounder>{currentIndex + 1}/</SRounder>
            <SRounder>{detailsProducts.images.length}</SRounder>
          </WrapText>
        </View>
        <ContainerInfor>
          <ViewProduct>
            <SText>{'Các mặt hàng'}</SText>
          </ViewProduct>
          <WrapView>
            {detailsProducts.images.map((img, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    handleImage(index);
                  }}
                  key={index}>
                  <ImageShow source={{uri: img.src}} key={index} />
                </TouchableOpacity>
              );
            })}
          </WrapView>
        </ContainerInfor>
        <Divider height={8} />

        {detailsProducts.date_on_sale_to ? (
          <FlashSale>
            <View style={styles.rowSale}>
              <IconFlash source={IC_FLASH_SALE} />
              <Title>{'FLASH SALE'}</Title>
            </View>
            <ViewCountTime>
              <View style={styles.rowSale}>
                <SPrice>
                  {parseInt(detailsProducts.regular_price).toLocaleString('en')}
                  đ
                </SPrice>
                <SalePrice>
                  {detailsProducts.sale_price
                    ? `${parseInt(detailsProducts.sale_price).toLocaleString(
                        'en',
                      )}đ`
                    : `${parseInt(detailsProducts.regular_price).toLocaleString(
                        'en',
                      )}đ`}
                </SalePrice>
              </View>
              <View style={styles.rowSale}>
                <TextEnd>KẾT THÚC TRONG</TextEnd>
                <CountDownComponent
                  targetDate={detailsProducts.date_on_sale_to}
                />
              </View>
            </ViewCountTime>
          </FlashSale>
        ) : (
          ''
        )}

        <ContainerInfor>
          <WrapBanner>
            {detailsProducts.featured && <IconHot source={IC_HOT} />}
            <STitle numberOfLines={2}>{detailsProducts.name}</STitle>
            {!detailsProducts.date_on_sale_to && detailsProducts.on_sale && (
              <BannerSale>
                <SSale>{percentSale}%</SSale>
                <SDiscount>GIẢM</SDiscount>
                <Border />
              </BannerSale>
            )}
          </WrapBanner>
          {detailsProducts.date_on_sale_to ? (
            ''
          ) : detailsProducts.on_sale ? (
            <TextPrice>
              {parseInt(detailsProducts.sale_price).toLocaleString('en')}đ
            </TextPrice>
          ) : (
            <TextPrice>
              {detailsProducts.regular_price
                ? `${parseInt(detailsProducts.regular_price).toLocaleString(
                    'en',
                  )}đ`
                : `${parseInt(detailsProducts.price).toLocaleString('en')}đ`}
            </TextPrice>
          )}

          {!detailsProducts.date_on_sale_to && detailsProducts.on_sale && (
            <SRegularPrice>
              {parseInt(detailsProducts.regular_price).toLocaleString('en')}đ
            </SRegularPrice>
          )}

          <STextTotal>{`Danh mục: ${detailsProducts.categories[0].name}`}</STextTotal>
          <STextTotal>{`Brand: ${titleBrand}`}</STextTotal>
          <ViewShortDesc>
            <SDesc>Mô tả:</SDesc>
            <HTMLRenderer
              htmlContent={detailsProducts.short_description}
              containerStyle={{
                flex: 1,
              }}
            />
          </ViewShortDesc>
        </ContainerInfor>
        <Divider height={1} />
        <WrapAction>
          <WrapBanner>
            {Array.from(
              Array(parseInt(detailsProducts.average_rating)).keys(),
            ).map(index => {
              return <Image source={IC_STAR_FILL} key={index} />;
            })}
            {Array.from(
              Array(5 - parseInt(detailsProducts.average_rating)).keys(),
            ).map(index => {
              return <Image source={IC_STAR} key={index} />;
            })}
            <STextRate>{detailsProducts.average_rating}</STextRate>
          </WrapBanner>
          <WrapBanner>
            <OptionSelector>
              <Menu>
                <MenuTrigger customStyles={triggerStyles}>
                  <ShareIcon source={IC_SHARE_SOCIAL} />
                </MenuTrigger>
                <MenuOptions customStyles={optionsStyles}>
                  <OptionMenu>
                    <MenuOption
                      customStyles={optionStyles}
                      onSelect={onSelectedOption}>
                      <OptionMenuItemIcon source={IC_FACEBOOK} />
                      <OptionMenuItemTitle>{'Facebook'}</OptionMenuItemTitle>
                    </MenuOption>
                    <MenuOption customStyles={optionStyles}>
                      <OptionMenuItemIcon source={IC_LINKEDIN} />
                      <OptionMenuItemTitle>{'LinkedIn'}</OptionMenuItemTitle>
                    </MenuOption>
                    <MenuOption customStyles={optionStyles}>
                      <OptionMenuItemIcon source={IC_TWITTER} />
                      <OptionMenuItemTitle>{'Twitter'}</OptionMenuItemTitle>
                    </MenuOption>
                  </OptionMenu>
                </MenuOptions>
              </Menu>
            </OptionSelector>
            <STouch>
              <Image source={IC_HEART} />
            </STouch>
          </WrapBanner>
        </WrapAction>
        {detailsProducts.related_ids.length > 0 && (
          <>
            <Divider height={8} />
            <ContainerInfor>
              <ViewProduct>
                <SText>{'Các sản phẩm tương tự'}</SText>
              </ViewProduct>
              <WrapView>
                <FlatList
                  data={detailsProducts.related_ids}
                  renderItem={renderItem}
                  horizontal={true}
                  showsHorizontalScrollIndicator={false}
                />
              </WrapView>
            </ContainerInfor>
          </>
        )}
        <Divider height={8} />
        <ContainerDetails>
          <SText>{'Chi tiết sản phẩm'}</SText>
          <View style={styles.desc}>
            <HTMLRenderer
              htmlContent={removeDesc(detailsProducts.description)}
            />
          </View>
        </ContainerDetails>
        {detailsProducts.reviews_allowed && (
          <>
            <Divider height={8} />
            <ContainerRate>
              <ViewInfor>
                <SText>{'Đánh giá'}</SText>
                <TouchableOpacity onPress={onNavigateModalReview}>
                  <STextReview>{'Viết đánh giá'}</STextReview>
                </TouchableOpacity>
              </ViewInfor>
              {Post.length > 0 ? (
                <Posts
                  posts={Post}
                  loadPostsFn={() => {}}
                  loadMoreFn={() => {}}
                  postReactionFn={() => {}}
                  deletePostFn={() => {}}
                  editPostFn={() => {}}
                />
              ) : (
                <WrapReviews>
                  <SNoReviews source={IC_NO_REVIEWS} />
                  <STextNoReviews>Chưa có đánh giá nào</STextNoReviews>
                </WrapReviews>
              )}
            </ContainerRate>
          </>
        )}
        {anotherProducts.length > 1 ? (
          <ViewProductOther>
            <WrapTitle>
              <Line />
              <TextOther>Có thể bạn cũng thích</TextOther>
              <Line />
            </WrapTitle>
            <FlatList
              data={[...anotherProducts].filter(i => i !== detailsProducts?.id)}
              renderItem={renderAnotherProduct}
              numColumns={2}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{marginTop: 12, marginHorizontal: 16}}
              columnWrapperStyle={{
                justifyContent: 'space-between',
              }}
            />
            <View style={{height: 100}} />
          </ViewProductOther>
        ) : (
          <View style={{height: 50}} />
        )}
      </ScreenScrollWrapper>
      <ContainerBuy>
        <ContainerIcon onPress={show}>
          <SIcon source={IC_BUY} />
        </ContainerIcon>
        <STouchBuy onPress={onPushToCart}>
          <STextBuy>{'Mua ngay'}</STextBuy>
        </STouchBuy>
      </ContainerBuy>
      <BottomBuyModal
        isVisible={isVisible}
        name={detailsProducts.name}
        image={detailsProducts.images[0]?.src}
        price={detailsProducts.price}
        onClose={hide}
        params={params}
        onChange={onSubmit}
      />
    </ScreenWrapper>
  );
});

const SLoad = styled(LoaderRender)`
  margin: 40px 0 0 16px;
`;

const ContainerIcon = styled.TouchableOpacity`
  flex: 1;
  align-items: center;
  justify-content: center;
  border-width: 1px;
  height: 100%;
  border-color: ${Colors.gray5};
`;

const SIcon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${Colors.gray1};
`;

const STouchInfo = styled.TouchableOpacity`
  width: 36px;
  height: 36px;
  align-items: center;
  justify-content: center;
  border-radius: 50px;
`;

const SImage = styled(FastImage)`
  height: ${scale(350)}px;
`;
const WrapText = styled.View`
  background: ${Colors.gray11};
  border-radius: 16px;
  width: 40px;
  height: 26px;
  flex-direction: row;
  position: absolute;
  right: 15px;
  bottom: 11px;
  align-items: center;
  justify-content: center;
`;
const SRounder = styled(Regular)`
  font-size: 14px;
  color: ${Colors.white};
`;
const ContainerInfor = styled.View`
  background-color: ${Colors.white};
  padding: 12px 16px 12px 20px;
`;
const ViewInfor = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const TextPrice = styled(Medium)`
  font-size: 18px;
  color: ${Colors.red1};
  margin-top: 10px;
`;

const SRegularPrice = styled(Regular)`
  font-size: 16px;
  text-decoration-line: line-through;
  margin-top: 4px;
`;
const WrapView = styled.View`
  flex-direction: row;
  align-items: center;
`;
const WrapAction = styled(WrapView)`
  justify-content: space-between;
  padding: 12px 16px 12px 20px;
`;
const STouch = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const WrapBanner = styled.View`
  flex-direction: row;
  align-items: center;
`;
const BannerSale = styled.View`
  width: 40px;
  height: 36px;
  background-color: ${Colors.orange1};
`;
const Border = styled.View`
  position: absolute;
  border-left-width: 20px;
  border-right-width: 20px;
  border-bottom-width: 8px;
  bottom: -8px;
  border-left-color: ${Colors.orange1};
  border-right-color: ${Colors.orange1};
  border-top-color: transparent;
  border-bottom-color: transparent;
`;

const SSale = styled(Regular)`
  text-align: center;
  margin-top: 4px;
  font-size: 14px;
  color: ${Colors.red1};
`;

const SDiscount = styled(Regular)`
  color: ${Colors.backgroundColor};
  font-size: 14px;
  text-align: center;
`;
const STitle = styled(Regular)`
  font-size: 18px;
  color: ${Colors.gray1};
  flex: 1;
`;
const SText = styled(Medium)`
  font-size: 18px;
  color: ${Colors.gray1};
`;

const STextRate = styled(Regular)`
  margin-left: 13px;
  font-size: 14px;
  margin-right: 10px;
  color: ${Colors.gray1};
`;
const STextTotal = styled(Regular)`
  margin-top: 10px;
  font-size: 14px;
  color: ${Colors.gray1};
`;

const SDesc = styled(Regular)`
  font-size: 14px;
  color: ${Colors.gray1};
  margin-right: 4px;
`;

const ViewProduct = styled.View`
  margin-bottom: 16px;
`;

const ImageShow = styled.Image`
  border-radius: 10px;
  width: ${scale(50)}px;
  height: ${scale(50)}px;
  margin-right: 12px;
`;

const ContainerDetails = styled.View`
  background-color: ${Colors.white};
  margin-top: 8px;
  padding: 12px 20px 16px 20px;
`;

const ContainerRate = styled(ContainerDetails)``;

const STouchBuy = styled(TouchableOpacity)`
  background-color: ${Colors.red1};
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const STextBuy = styled(Medium)`
  flex: 1;
  color: ${Colors.white};
  font-size: 16px;
  text-align: center;
  height: 100%;
  padding: 16px 0;
`;

const IconHot = styled.Image`
  width: 32px;
  height: 32px;
  margin-right: 12px;
`;

const ContainerBuy = styled.SafeAreaView`
  flex-direction: row;
  align-items: center;
  position: absolute;
  bottom: 0;
  background-color: ${Colors.backgroundColor};
`;

const ViewAmount = styled.View`
  background-color: ${Colors.red1};
  width: ${scale(20)}px;
  height: ${scale(20)}px;
  border-radius: 20px;
  position: absolute;
  justify-content: center;
  right: -2px;
  top: -4px;
}
`;
const SAmount = styled(Medium)`
  color: ${Colors.white};
  font-size: 16px;
  text-align: center;
  align-items: center;
  justify-content: center;
`;

const ViewShortDesc = styled.View`
  padding-top: 12px;
  flex-direction: row;
`;

const STextReview = styled(Regular)`
  font-size: 16px;
  color: ${Colors.red1};
`;

const OptionSelector = styled.View`
  margin-right: 16px;
`;

const ShareIcon = styled.Image`
  width: 24px;
  height: 24px;
`;

const OptionMenu = styled.View`
  background-color: ${Colors.white};
  border-radius: 8px;
`;

const OptionMenuItemIcon = styled.Image`
  width: ${scale(20)}px;
  height: ${scale(20)}px;
  margin-right: 16px;
`;

const OptionMenuItemTitle = styled(Regular)`
  font-size: 14px;
  color: ${Colors.gray1};
`;

interface triggerStylesProps {
  triggerOuterWrapper?: StyleProp<ViewStyle>;
  triggerWrapper?: StyleProp<ViewStyle>;
  triggerText?: StyleProp<TextStyle>;
  TriggerTouchableComponent?: Function;
  triggerTouchable?: {};
}

interface MenuOptionsCustomStyle extends MenuOptionCustomStyle {
  optionsWrapper?: StyleProp<ViewStyle>;
  optionsContainer?: StyleProp<ViewStyle>;
}

interface MenuOptionCustomStyle {
  optionWrapper?: StyleProp<ViewStyle>;
  optionText?: StyleProp<TextStyle>;
  optionTouchable?: {};
  OptionTouchableComponent?: Function;
}

const triggerStyles: triggerStylesProps = {
  triggerWrapper: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const optionsStyles: MenuOptionsCustomStyle = {
  optionsContainer: {
    width: 140,
    borderRadius: 8,
  },
};

const optionStyles: MenuOptionCustomStyle = {
  optionWrapper: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomColor: Colors.gray5,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
};

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

const WrapReviews = styled.View`
  justify-content: center;
  align-items: center;
  margin-top: 12px;
`;
const SNoReviews = styled.Image`
  width: ${scale(150)}px;
  height: ${scale(150)}px;
`;
const STextNoReviews = styled(Medium)`
  font-size: 18px;
  color: ${Colors.gray1};
  margin-top: 12px;
`;

const FlashSale = styled.View`
  background-color: ${Colors.red1};
  padding: 12px 16px 12px 20px;
  justify-content: space-between;
`;

const Title = styled(Regular)`
  color: ${Colors.backgroundColor};
  font-size: 14px;
  margin-left: 4px;
`;

const IconFlash = styled.Image`
  width: 18px;
  height: 18px;
`;

const ViewCountTime = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
`;

const TextEnd = styled(Regular)`
  color: ${Colors.backgroundColor};
  font-size: 12px;
`;

const SalePrice = styled(Bold)`
  font-size: 16px;
  color: ${Colors.backgroundColor};
`;

const SPrice = styled(Regular)`
  font-size: 14px;
  text-decoration-line: line-through;
  color: ${Colors.gray12};
  margin-right: 4px;
`;

const styles = StyleSheet.create({
  maxWeight: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  space: {
    marginRight: 16,
  },

  imageSpace: {
    marginRight: 12,
  },
  flex: {
    flexDirection: 'row',
    marginVertical: 12,
  },
  line: {
    width: 30,
    height: 2,
    backgroundColor: Colors.gray1,
    position: 'absolute',
    bottom: -3,
  },
  desc: {
    marginTop: 10,
  },
  backgroundHeader: {
    backgroundColor: Colors.transparent,
  },
  viewHeader: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    right: 0,
    left: 0,
  },
  rowSale: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default ProductDetailsScreen;
