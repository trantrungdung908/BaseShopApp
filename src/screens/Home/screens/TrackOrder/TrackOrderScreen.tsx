import React, {memo, useCallback, useState} from 'react';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import ScreenWrapper from '@/components/ScreenWrapper';
import {StyleSheet} from 'react-native';
import {
  TrackOrderTabBar,
  TYPE_TAB_TRACK_ORDER,
} from '@/screens/Home/screens/TrackOrder/components/TrackOrderTabBar';
import PagerView from 'react-native-pager-view';
import {Colors} from '@/themes';
import {ProcessingOrderTab} from '@/screens/Home/screens/TrackOrder/tabs/ProcessingOrderTab';
import {getInfo} from '@/store/user';

export interface TrackParams {
  page?: number;
  per_page?: number;
  customer: number;
  status: string;
}

export const TrackOrderScreen = memo(function TrackOrderScreen() {
  const pagerViewRef = React.useRef<PagerView>();
  const user = getInfo();
  const [paramsOrder, setParamsOrder] = useState<TrackParams>({
    page: 1,
    per_page: 10,
    customer: user.id,
    status: 'processing',
  });

  const onChangeTab = useCallback((value: TYPE_TAB_TRACK_ORDER) => {
    if (value === TYPE_TAB_TRACK_ORDER.DANG_XU_LY) {
      pagerViewRef.current?.setPage(0);
      setParamsOrder(state => ({...state, status: 'processing', page: 1}));

      return;
    } else if (value === TYPE_TAB_TRACK_ORDER.CHO_THANH_TOAN) {
      pagerViewRef.current?.setPage(1);
      setParamsOrder(state => ({...state, status: 'pending', page: 1}));
      return;
    } else if (value === TYPE_TAB_TRACK_ORDER.HOAN_THANH) {
      pagerViewRef.current?.setPage(2);
      setParamsOrder(state => ({...state, status: 'completed', page: 1}));

      return;
    } else if (value === TYPE_TAB_TRACK_ORDER.HUY) {
      pagerViewRef.current?.setPage(3);
      setParamsOrder(state => ({...state, status: 'cancelled', page: 1}));

      return;
    }
  }, []);

  return (
    <ScreenWrapper>
      <DynamicHeader title="Đơn hàng" />
      <TrackOrderTabBar onChangeTab={onChangeTab} />
      <PagerView
        ref={pagerViewRef as any}
        initialPage={0}
        scrollEnabled={false}
        style={styles.container}>
        <ProcessingOrderTab params={paramsOrder} onChangeTab={setParamsOrder} />
        <ProcessingOrderTab params={paramsOrder} onChangeTab={setParamsOrder} />
        <ProcessingOrderTab params={paramsOrder} onChangeTab={setParamsOrder} />
        <ProcessingOrderTab params={paramsOrder} onChangeTab={setParamsOrder} />
      </PagerView>
    </ScreenWrapper>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.gray7,
  },
});
