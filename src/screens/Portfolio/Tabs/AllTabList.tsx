import React, {memo, useCallback} from 'react';
import {FlatList, Platform, StyleSheet} from 'react-native';
import {navigateToPortfolioDetailsScreen} from '@/utils/navigation';
import {BaseStyles} from '@/themes/BaseStyles';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {PortfolioItem} from '@/screens/Portfolio/components/PortfolioItem';
import {styled} from '@/global';
import LoaderRender from '@/components/Views/LoaderRender';
import {BaseRefreshControl} from '@/components/Common/BaseRefreshControl';

export interface AllTabListInterface {
  onChangeParams?: () => void;
  portfolioIds: string[];
  loading: boolean;
}

export const AllTabList = memo(function ({
  onChangeParams,
  portfolioIds,
  loading,
}: AllTabListInterface) {
  const onNavigatePortfolioDetails = useCallback((idPortfolio: number) => {
    navigateToPortfolioDetailsScreen({idPortfolio});
  }, []);
  const renderItem = useCallback(
    // @ts-ignore
    ({item}) => {
      return (
        <PortfolioItem
          item={item}
          onPress={() => onNavigatePortfolioDetails(item)}
        />
      );
    },
    [onNavigatePortfolioDetails],
  );

  return (
    <>
      {!loading ? (
        <FlatList
          data={portfolioIds}
          renderItem={renderItem}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <BaseRefreshControl
              onRefresh={onChangeParams}
              refreshing={loading}
            />
          }
          contentContainerStyle={[
            BaseStyles.ml12,
            BaseStyles.mt16,
            styles.container,
          ]}
        />
      ) : (
        <SLoad />
      )}
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    paddingBottom:
      Platform.OS === 'ios' ? getBottomSpace() + 80 : getBottomSpace() + 90,
  },
});
const SLoad = styled(LoaderRender)`
  margin: 12px 16px;
`;
