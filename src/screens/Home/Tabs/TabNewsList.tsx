import React, {memo, useCallback} from 'react';
import {BaseStyles} from '@/themes/BaseStyles';
import LoaderRender from '@/components/Views/LoaderRender';
import {FlatList, LayoutChangeEvent, StyleSheet, Text} from 'react-native';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {NewsItem} from '@/screens/Home/components/NewsItem';

interface TabNewsList {
  data: any;
  onGetHeight?: (value: number) => void;
}

export const TabNewsList = memo(function ({data, onGetHeight}: TabNewsList) {
  const renderItem = useCallback(
    // @ts-ignore
    ({item, index}) => {
      return <NewsItem item={item} index={index} key={index} />;
    },
    [],
  );

  const onLayoutHeight = useCallback(
    (event: LayoutChangeEvent) => {
      onGetHeight && onGetHeight(event.nativeEvent.layout.height + 120);
    },
    [onGetHeight],
  );

  return (
    <FlatList
      onLayout={onLayoutHeight}
      data={data}
      renderItem={renderItem}
      numColumns={2}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[
        BaseStyles.ml12,
        BaseStyles.mt16,
        styles.container,
      ]}
      ListEmptyComponent={<LoaderRender />}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    paddingBottom: getBottomSpace() + 50,
    flex: 1,
    height: 1000,
  },
});
