import React, {memo, useCallback} from 'react';
import {ProductItem} from '@/screens/Home/screens/Products/components/ProductItem';
import {FlatList, StyleSheet} from 'react-native';
import {navigateToProductDetailsScreen} from '@/utils/navigation';
import {BaseStyles} from '@/themes/BaseStyles';
import {BaseRefreshControl} from '@/components/Common/BaseRefreshControl';
import LoaderRender from '@/components/Views/LoaderRender';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export interface AllTabListInterface {
  onChangeParams?: () => void;
  productIds: string[];
  loading: boolean;
  onUpdate?: () => void;
}

export const TabProductList = memo(function ({
  onChangeParams,
  productIds,
  loading,
  onUpdate,
}: AllTabListInterface) {
  const onNavigateProductDetails = useCallback((idProduct: number) => {
    navigateToProductDetailsScreen({idProduct});
  }, []);

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

  return (
    <FlatList
      data={productIds}
      renderItem={renderItem}
      initialNumToRender={10}
      numColumns={2}
      keyExtractor={item => item.toString()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        BaseStyles.ml16,
        BaseStyles.mr16,
        BaseStyles.mt16,
        styles.container,
      ]}
      columnWrapperStyle={{
        justifyContent: 'space-between',
      }}
      onEndReached={onUpdate}
      onEndReachedThreshold={0.01}
      ListEmptyComponent={loading ? <LoaderRender /> : null}
      ListFooterComponent={loading ? <LoaderRender /> : null}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    paddingBottom: getBottomSpace() + 50,
  },
});
