import React, {memo, useCallback} from 'react';
import {ProductItem} from '@/screens/Home/screens/Products/components/ProductItem';
import {FlatList, StyleSheet} from 'react-native';
import {navigateToProductDetailsScreen} from '@/utils/navigation';
import {BaseStyles} from '@/themes/BaseStyles';
import {BaseRefreshControl} from '@/components/Common/BaseRefreshControl';
import LoaderRender from '@/components/Views/LoaderRender';
import {styled} from '@/global';
import {getBottomSpace} from 'react-native-iphone-x-helper';

export interface AllTabListInterface {
  onChangeParams?: () => void;
  productIds: string[];
  loading: boolean;
}

export const AllTabList = memo(function ({
  onChangeParams,
  productIds,
  loading,
}: AllTabListInterface) {
  const onNavigateProductDetails = useCallback((idProduct: number) => {
    navigateToProductDetailsScreen({idProduct});
  }, []);

  const renderItem = useCallback(
    // @ts-ignore
    ({item, index}) => {
      return (
        <ProductItem
          item={item}
          onPress={() => onNavigateProductDetails(item.id)}
        />
      );
    },
    [onNavigateProductDetails],
  );
  return (
    <>
      {!loading ? (
        <FlatList
          data={productIds}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={[
            BaseStyles.ml12,
            BaseStyles.mt16,
            styles.container,
          ]}
          refreshControl={
            <BaseRefreshControl
              onRefresh={onChangeParams}
              refreshing={loading}
            />
          }
          ListEmptyComponent={loading ? <LoaderRender /> : null}
        />
      ) : (
        <SLoad />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingBottom: getBottomSpace() + 50,
  },
});

const SLoad = styled(LoaderRender)`
  margin: 12px 16px;
`;
