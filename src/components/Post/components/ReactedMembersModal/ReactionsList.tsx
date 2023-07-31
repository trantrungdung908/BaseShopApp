import React, {memo} from "react";
import {FlatList, ListRenderItem, StyleSheet} from "react-native";
import {RawReactionInterface} from "@base/core/types";
import ReactionRow from "./ReactionRow";
import { getBottomSpace } from 'react-native-iphone-x-helper';

interface Props {
    reacitons: RawReactionInterface[]
}

const renderItem: ListRenderItem<RawReactionInterface> = ({item}) => {
    return <ReactionRow reaction={item}/>;
};

const keyExtractor = (item: RawReactionInterface) => item.user_id + '_' + item.reaction;

const ReactionsList = memo(({reacitons}: Props) => {

    return <FlatList
        data={reacitons}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={styles.list}
    />
});

ReactionsList.displayName = "ReactionsList";

export default ReactionsList;


const styles = StyleSheet.create({
  list: {
      paddingBottom: getBottomSpace() / 2
  }
})