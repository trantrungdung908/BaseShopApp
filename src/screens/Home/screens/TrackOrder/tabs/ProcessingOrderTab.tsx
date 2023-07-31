import React, {memo, useCallback} from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestOrders} from '@/store/order/functions';
import {navigateToTrackOrderDetailsScreen} from '@/utils/navigation';
import {TrackOrderItem} from '@/screens/Home/screens/TrackOrder/components/TrackOrderItem';
import {useOrderByQuery} from '@/store/order';
import {TrackParams} from '@/screens/Home/screens/TrackOrder/TrackOrderScreen';
import {FlatList, StyleSheet} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {styled} from '@/global';
import LoaderRender from '@/components/Views/LoaderRender';
import {BaseRefreshControl} from '@/components/Common/BaseRefreshControl';
import {BaseStyles} from '@/themes/BaseStyles';
import {EmptyView} from '@/components/Views/EmptyView';
import {Colors} from '@/themes';

interface ProcessingOrderTabInterface {
  params: TrackParams;
  onChangeTab?: (value: TrackParams) => void;
}

export const ProcessingOrderTab = memo(function ({
  params,
  onChangeTab,
}: ProcessingOrderTabInterface) {
  const orderIds = useOrderByQuery('all');

  const onNavigateToTrackOrderDetails = useCallback((id: number) => {
    navigateToTrackOrderDetailsScreen({idOrder: id});
  }, []);

  const renderItem = useCallback(
    // @ts-ignore
    ({item}) => {
      return (
        <TrackOrderItem
          id={item}
          onPress={() => onNavigateToTrackOrderDetails(item)}
        />
      );
    },
    [onNavigateToTrackOrderDetails],
  );

  const {error, loading, call} = useAsyncEffect(async () => {
    await requestOrders(params);
  }, [params]);

  const updateParams = useCallback(async () => {
    if (orderIds.length >= 10) {
      // setParamsOrder(state => ({
      //   ...state,
      //   page: (paramsOrder?.page || 0) + 1,
      // }));
    }
    return;
  }, []);

  const onRefresh = useCallback(() => {
    onChangeTab?.(Object.assign({}, params, {page: 1}));
  }, [onChangeTab, params]);

  return (
    <ScreenWrapper>
      {loading && params.page === 1 ? (
        <SLoad />
      ) : (
        <FlatList
          data={orderIds}
          renderItem={renderItem}
          style={styles.list}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.spaceList}
          onEndReachedThreshold={0.04}
          onEndReached={updateParams}
          keyExtractor={item => item.toString()}
          ListEmptyComponent={
            loading ? <SLoad /> : <EmptyView title={'Không có dữ liệu'} />
          }
          ListFooterComponent={loading ? <SLoad /> : null}
          refreshControl={
            <BaseRefreshControl onRefresh={onRefresh} refreshing={loading} />
          }
        />
      )}
    </ScreenWrapper>
  );
});

const SLoad = styled(LoaderRender)`
  margin: 10px;
`;

const styles = StyleSheet.create({
  spaceList: {
    paddingBottom: getBottomSpace() + 60,
  },
  list: {
    flex: 1,
    backgroundColor: Colors.gray7,
  },
});
