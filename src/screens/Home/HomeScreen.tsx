import React, {memo, useCallback, useRef, useState} from 'react';
import {styled} from '@/global';
import {
  IC_BUY,
  IC_CATEGORY,
  IC_FLASH_SALE,
  IC_NAV_SEARCH,
  IMG_COMMUNITY,
  IMG_SALE_1,
  IMG_SALE_3,
  IMG_SALE_4,
} from '@/assets';
import {scale} from '@/utils/scale';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  RefreshControl,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {CategoryItem} from './components/CategoryItem';
import {ListItem} from './components/ListItem';
import {CategoryData, dataList} from './components/dummydata';
import {StatusBarViewTransparent} from '@/components/Header/DynamicHeader';
import {
  navigateToCartScreen,
  navigateToModalSearch,
  navigateToProductDetailsScreen,
} from '@/utils/navigation';
import {Bold, Medium, Regular} from '@/components/CommonStyled';
import ScreenWrapper from '@/components/ScreenWrapper';
import {Colors} from '@/themes';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import useAutoToastError from '@/hooks/useAutoToastError';
import {
  requestProductsFlashSale,
  requestProductsList,
  requestProductsListRecommend,
} from '@/store/product/functions';
import {useProductByQuery} from '@/store/product';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {ProductItem} from '@/screens/Home/screens/Products/components/ProductItem';
import {requestCarts} from '@/store/cart/functions';
import {requestGetMe} from '@/store/user/functions';
import {useCartByQuery} from '@/store/cart';
import {requestProductReviews} from '@/store/reviews/functions';
import {getUserAccessToken} from '@/store/user';
import FastImage from 'react-native-fast-image';
import {requestProductCategories} from '@/store/category/functions';
import {FlashItem} from '@/screens/Home/screens/Products/components/FlashItem';

export const HomeScreen = memo(function HomeScreen() {
  const token = getUserAccessToken();
  const animationValue = useRef(new Animated.Value(0)).current;
  const bannerImage = [IMG_SALE_1, IMG_SALE_3, IMG_SALE_4];
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const params = {
    tag: 82,
    page: 1,
    per_page: 10,
  };
  const itemsCount = useCartByQuery('all');
  const recommendProduct = useProductByQuery('recommend');
  const flashSaleProduct = useProductByQuery('flashSale');

  const {
    loading: loadingData,
    value,
    call,
    error,
  } = useAsyncEffect(async () => {
    await requestProductCategories();
    await requestProductsList({page: 1, per_page: 100});
    await requestProductsFlashSale({
      page: 1,
      per_page: 10,
      tag: 88,
    });
    await requestProductsListRecommend(params);
    await requestProductReviews({page: 1, per_page: 100});
    await requestCarts();
  }, []);

  const {loading} = useAsyncEffect(async () => {
    await requestGetMe(token);
  }, []);
  console.log('a');

  const renderItemProduct = useCallback(
    // @ts-ignore
    ({item}) => {
      return (
        <ProductItem
          item={item}
          onPress={() => navigateToProductDetailsScreen({idProduct: item})}
        />
      );
    },
    [],
  );

  const renderItemFlash = useCallback(
    // @ts-ignore
    ({item}) => {
      return (
        <FlashItem
          item={item}
          onPress={() => navigateToProductDetailsScreen({idProduct: item})}
        />
      );
    },
    [],
  );

  const renderCategory = useCallback(
    // @ts-ignore
    ({item}) => {
      return (
        <CategoryItem
          item={item}
          isEven={CategoryData.length / 2 === 3}
          onSelected={item.onSelected}
        />
      );
    },
    [],
  );

  useAutoToastError(error);

  const handleScroll = useCallback(
    (e: {nativeEvent: {contentOffset: {x: any}}}) => {
      const contentOffsetX = e.nativeEvent.contentOffset.x;
      const currentIndex = Math.round(
        contentOffsetX / Dimensions.get('window').width,
      );
      setCurrentSlideIndex(currentIndex);
    },
    [],
  );

  const onNavigateToSearchScreen = useCallback(() => {
    navigateToModalSearch();
  }, []);

  const searchInputAnimation = {
    opacity: animationValue.interpolate({
      inputRange: [-50, 0],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    }),
  };

  const backgroundInterpolate = animationValue.interpolate({
    inputRange: [0, 50],
    outputRange: ['transparent', Colors.backgroundColor],
  });

  const iconImage = animationValue.interpolate({
    inputRange: [0, 50],
    outputRange: [Colors.backgroundColor, Colors.orange1],
    extrapolate: 'clamp',
  });

  const tintColorStyle = {
    tintColor: iconImage,
  };

  const backgroundStyle = {
    backgroundColor: backgroundInterpolate,
  };

  return (
    <ScreenWrapper>
      <Animated.View
        style={[styles.searchBar, backgroundStyle, searchInputAnimation]}>
        <StatusBarViewTransparent />
        <HeaderView>
          <TouchableWithoutFeedback onPress={onNavigateToSearchScreen}>
            <WrapSearch>
              <SIconSearch source={IC_NAV_SEARCH} />
              <STextFind>Tìm kiếm sản phẩm</STextFind>
            </WrapSearch>
          </TouchableWithoutFeedback>
          <ViewAction>
            <CartBtn onPress={() => navigateToCartScreen()}>
              <Animated.Image source={IC_BUY} style={tintColorStyle} />
              {itemsCount.length > 0 ? (
                <ViewAmount>
                  <SAmount>{itemsCount.length}</SAmount>
                </ViewAmount>
              ) : (
                ''
              )}
            </CartBtn>
          </ViewAction>
        </HeaderView>
      </Animated.View>

      <Container
        refreshControl={
          <RefreshControl refreshing={loadingData} onRefresh={call} />
        }
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={e => {
          const offsetY = e.nativeEvent.contentOffset.y;
          animationValue.setValue(offsetY);
        }}>
        <View>
          <ScrollView
            onMomentumScrollEnd={handleScroll}
            pagingEnabled
            scrollEventThrottle={16}
            horizontal
            showsHorizontalScrollIndicator={false}>
            {bannerImage.map((item, index) => {
              return (
                <View style={styles.maxWeight} key={index}>
                  <SImage resizeMode={'stretch'} source={item} />
                </View>
              );
            })}
          </ScrollView>
          <WrapDot>
            <View style={styles.row}>
              {bannerImage.map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.dot,
                    currentSlideIndex === index && {
                      backgroundColor: Colors.backgroundColor,
                    },
                  ]}
                />
              ))}
            </View>
          </WrapDot>
        </View>

        <ContainerCategory>
          <ViewCategory>
            <CatIcon source={IC_CATEGORY} />
            <Title>{'Danh mục'}</Title>
          </ViewCategory>
          <ScrollView
            horizontal
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}>
            <FlatList
              scrollEnabled={false}
              numColumns={Math.ceil(CategoryData.length / 2)}
              showsHorizontalScrollIndicator={false}
              data={CategoryData || []}
              renderItem={renderCategory}
              // @ts-ignore
              keyExtractor={item => item.id.toString()}
            />
          </ScrollView>
        </ContainerCategory>
        <ContainerCommunity>
          <ComIcon source={IMG_COMMUNITY} />
          <Title>{'Cộng đồng'}</Title>
        </ContainerCommunity>
        <ContainerList>
          {dataList.map((item, index) => {
            return (
              <ListItem
                onPress={item.onSelected}
                item={item}
                index={index}
                key={index}
              />
            );
          })}
        </ContainerList>
        <ContainerCommunity>
          <ComIcon source={IC_FLASH_SALE} />
          <Title>{'Flash Sale'}</Title>
        </ContainerCommunity>
        <View style={styles.flashSale}>
          <FlatList
            data={flashSaleProduct}
            renderItem={renderItemFlash}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>

        <ContainerCommunity>
          <ComIcon source={IMG_COMMUNITY} />
          <Title>{'Gợi ý hôm nay'}</Title>
        </ContainerCommunity>
        <ContainerRateProductList>
          <FlatList
            data={recommendProduct}
            renderItem={renderItemProduct}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{marginTop: 12, marginHorizontal: 16}}
            columnWrapperStyle={{
              justifyContent: 'space-between',
            }}
          />
        </ContainerRateProductList>
      </Container>
    </ScreenWrapper>
  );
});

const HeaderView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 70px;
`;

const WrapSearch = styled.View`
  flex: 1;
  height: 40px;
  border-width: 1px;
  border-color: ${Colors.gray7};
  border-radius: 4px;
  margin: 0 10px 0 20px;
  flex-direction: row;
  align-items: center;
  background-color: ${Colors.backgroundColor};
`;

const STextFind = styled(Regular)`
  flex: 1;
  color: ${Colors.gray4};
  align-self: center;
  margin-left: 10px;
`;

const SIconSearch = styled(Image)`
  margin-left: 10px;
`;

const ViewAction = styled.View`
  margin-right: 15px;
`;

const CartBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const Container = styled.ScrollView`
  background-color: ${Colors.gray9};
  flex: 1;
`;

const SImage = styled(FastImage)`
  height: ${scale(200)}px;
  width: 100%;
`;

const WrapDot = styled.View`
  width: 100%;
  position: absolute;
  bottom: 10px;
  justify-content: center;
  align-items: center;
`;

const ContainerCategory = styled.View`
  background-color: ${Colors.white};
  margin-top: 8px;
  text-align: center;
  width: 100%;
`;
const ViewCategory = styled.View`
  align-items: center;
  flex-direction: row;
  padding: 15px 18px;
`;
const CatIcon = styled.Image`
  margin-right: 11px;
`;
const Title = styled(Bold)`
  font-size: 18px;
  color: ${Colors.gray2};
`;

const ContainerList = styled.View`
  background-color: ${Colors.white};
  width: 100%;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
const ContainerCommunity = styled.View`
  height: ${scale(48)}px;
  background-color: ${Colors.white};
  margin-top: 8px;
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-left: 16px;
`;

const ContainerRateProductList = styled.View`
  background-color: ${Colors.gray9};
  flex-direction: row;
  padding-bottom: ${getBottomSpace() + 120}px;
`;

const ComIcon = styled(CatIcon)`
  width: 20px;
  height: 20px;
`;

const ViewAmount = styled.View`
  background-color: ${Colors.red1};
  width: ${scale(15)}px;
  height: ${scale(15)}px;
  border-radius: 10px;
  position: absolute;
  justify-content: center;
  right: -6px;
  top: -8px;
  align-items: center;
`;

const SAmount = styled(Medium)`
  color: ${Colors.white};
  font-size: 16px;
  text-align: center;
`;

const styles = StyleSheet.create({
  maxWeight: {
    flex: 1,
    width: Dimensions.get('window').width,
  },
  searchStyle: {
    flex: 1,
    height: 40,
    marginHorizontal: 16,
    borderRadius: 4,
  },
  styleList: {
    height: scale(150),
    borderRadius: 16,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  dot: {
    marginHorizontal: 4,
    padding: 4,
    backgroundColor: Colors.gray3,
    borderRadius: 20,
  },
  row: {
    flexDirection: 'row',
  },
  searchBar: {
    position: 'absolute',
    zIndex: 1,
    left: 0,
    top: 0,
    right: 0,
  },
  flashSale: {
    backgroundColor: Colors.backgroundColor,
    flex: 1,
  },
});

export default HomeScreen;
