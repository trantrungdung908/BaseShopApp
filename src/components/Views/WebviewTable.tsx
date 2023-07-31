import React, {memo} from 'react';
import {View} from 'react-native';
import {HTMLTable, HTMLTableProps} from '@native-html/table-plugin';

function WebviewTable(props: HTMLTableProps) {
  return (
    <View>
      <HTMLTable
        computeHeuristicContentHeight={() => 1000}
        computeContainerHeight={state => state.contentHeight}
        animationType="animated"
        {...props}
      />
    </View>
  );
}

export default memo(WebviewTable);
