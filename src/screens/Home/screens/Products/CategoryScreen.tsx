import React, {memo, useCallback, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';
import ScreenWrapper from '@/components/ScreenWrapper';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestProductsList} from '@/store/product/functions';
import {Colors} from '@/themes';
import {useProductByQuery} from '@/store/product';
import {
  goBack,
  navigateToCartScreen,
  navigateToModalSearch,
  navigateToProductDetailsScreen,
} from '@/utils/navigation';
import {BaseRefreshControl} from '@/components/Common/BaseRefreshControl';
import {scale} from '@/utils/scale';
import {StatusBarViewTransparent} from '@/components/Header/DynamicHeader';
import {BaseStyles} from '@/themes/BaseStyles';
import LoaderRender from '@/components/Views/LoaderRender';
import {ProductItem} from '@/screens/Home/screens/Products/components/ProductItem';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import {IC_ARROW_LEFT, IC_BUY, IC_NAV_SEARCH} from '@/assets';
import {styled} from '@/global';
import {Medium, Regular} from '@/components/CommonStyled';
import {useCartByQuery} from '@/store/cart';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export interface ParamsCategory {
  page?: number;
  per_page?: number;
  search?: string;
  category?: string;
}

export const CategoryScreen = memo(function CategoryScreen() {
  const {category} = useNavigationParams<ParamsCategory>();
  const itemsCount = useCartByQuery('all');

  const [paramsCategory, setParamsCategory] = useState<ParamsCategory>({
    page: 1,
    per_page: 10,
    search: '',
    category: category,
  });
  const allProducts = useProductByQuery(category ? category : 'all');

  const onNavigateProductDetails = useCallback((idProduct: number) => {
    navigateToProductDetailsScreen({idProduct});
  }, []);

  const {error, loading, call} = useAsyncEffect(async () => {
    // @ts-ignore
    await requestProductsList(paramsCategory);
  }, [paramsCategory]);

  const renderItem = useCallback(
    // @ts-ignore
    ({item}) => {
      return (
        <ProductItem
          item={item}
          onPress={() => onNavigateProductDetails(item)}
        />
      );
    },
    [onNavigateProductDetails],
  );

  const updateParams = useCallback(async () => {
    if (allProducts.length >= 10) {
      setParamsCategory(state => ({
        ...state,
        page: (paramsCategory?.page || 0) + 1,
      }));
    }
    return;
  }, [allProducts.length, paramsCategory?.page]);

  const onNavigateToSearchScreen = useCallback(() => {
    navigateToModalSearch();
  }, []);

  return (
    <ScreenWrapper>
      <StatusBarViewTransparent />
      <ContainerSearch>
        <STouchBack onPress={goBack}>
          <Image source={IC_ARROW_LEFT} />
        </STouchBack>
        <TouchableWithoutFeedback onPress={onNavigateToSearchScreen}>
          <WrapSearch>
            <SIconSearch source={IC_NAV_SEARCH} />
            <STextFind>{'Tìm kiếm sản phẩm'}</STextFind>
          </WrapSearch>
        </TouchableWithoutFeedback>

        <CartBtn onPress={() => navigateToCartScreen()}>
          <Image source={IC_BUY} />
          {itemsCount.length > 0 ? (
            <ViewAmount>
              <SAmount>{itemsCount.length}</SAmount>
            </ViewAmount>
          ) : (
            ''
          )}
        </CartBtn>
      </ContainerSearch>

      <FlatList
        data={allProducts}
        renderItem={renderItem}
        numColumns={2}
        keyExtractor={item => item.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          BaseStyles.ml16,
          BaseStyles.mt16,
          BaseStyles.mr16,
          styles.container,
        ]}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        onEndReached={updateParams}
        onEndReachedThreshold={0.01}
        refreshControl={
          <BaseRefreshControl onRefresh={call} refreshing={loading} />
        }
        ListEmptyComponent={loading ? <LoaderRender /> : null}
        ListFooterComponent={loading ? <LoaderRender /> : null}
      />
    </ScreenWrapper>
  );
});

const STouchBack = styled.TouchableOpacity``;

const ContainerSearch = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 10px 16px;
`;

const WrapSearch = styled.View`
  flex: 1;
  height: 40px;
  border-width: 1px;
  border-color: ${Colors.gray7};
  border-radius: 4px;
  margin: 0 20px;
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

const CartBtn = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
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
  container: {
    paddingBottom: getBottomSpace() + 80,
  },
});

export default CategoryScreen;
