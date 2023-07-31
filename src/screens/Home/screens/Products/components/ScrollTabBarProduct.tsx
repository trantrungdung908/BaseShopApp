import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import TabColor from '../../../components/TabColor';
import {Colors} from '@/themes';
import {ViewWrapper} from '@/components';

export enum TYPE_TAB {
  ALL = 'All',
  ACCESSORIES = 'Accessories',
  CLOCKS = 'Clocks',
  COOKING = 'Cooking',
  FURNITURE = 'Furniture',
  LIGHTING = 'Lighting',
  TOYS = 'Toys',
}

interface ScrollTabBarProductInterface {
  onChangeTab?: (value: TYPE_TAB) => void;
}

export const ScrollTabBarProduct = memo(function ScrollTabBarProduct({
  onChangeTab,
}: ScrollTabBarProductInterface) {
  const [selected, setSelected] = useState<TYPE_TAB>(TYPE_TAB.ALL);

  const onChange = useCallback(
    (value: TYPE_TAB) => {
      onChangeTab && onChangeTab(value);
      setSelected(value);
    },
    [onChangeTab],
  );

  return (
    <ViewWrapper>
      <Container horizontal={true} showsHorizontalScrollIndicator={false}>
        <STouch
          isSelected={selected === TYPE_TAB.ALL}
          onPress={() => onChange(TYPE_TAB.ALL)}>
          <TabColor
            isSelected={selected === TYPE_TAB.ALL}
            typeTab={TYPE_TAB.ALL}
          />
        </STouch>
        <STouch
          isSelected={selected === TYPE_TAB.ACCESSORIES}
          onPress={() => onChange(TYPE_TAB.ACCESSORIES)}>
          <TabColor
            isSelected={selected === TYPE_TAB.ACCESSORIES}
            typeTab={TYPE_TAB.ACCESSORIES}
          />
        </STouch>
        <STouch
          isSelected={selected === TYPE_TAB.CLOCKS}
          onPress={() => onChange(TYPE_TAB.CLOCKS)}>
          <TabColor
            isSelected={selected === TYPE_TAB.CLOCKS}
            typeTab={TYPE_TAB.CLOCKS}
          />
        </STouch>
        <STouch
          isSelected={selected === TYPE_TAB.COOKING}
          onPress={() => onChange(TYPE_TAB.COOKING)}>
          <TabColor
            isSelected={selected === TYPE_TAB.COOKING}
            typeTab={TYPE_TAB.COOKING}
          />
        </STouch>
        <STouch
          isSelected={selected === TYPE_TAB.FURNITURE}
          onPress={() => onChange(TYPE_TAB.FURNITURE)}>
          <TabColor
            isSelected={selected === TYPE_TAB.FURNITURE}
            typeTab={TYPE_TAB.FURNITURE}
          />
        </STouch>
        <STouch
          isSelected={selected === TYPE_TAB.LIGHTING}
          onPress={() => onChange(TYPE_TAB.LIGHTING)}>
          <TabColor
            isSelected={selected === TYPE_TAB.LIGHTING}
            typeTab={TYPE_TAB.LIGHTING}
          />
        </STouch>
        <STouch
          isSelected={selected === TYPE_TAB.TOYS}
          onPress={() => onChange(TYPE_TAB.TOYS)}>
          <TabColor
            isSelected={selected === TYPE_TAB.TOYS}
            typeTab={TYPE_TAB.TOYS}
          />
        </STouch>
      </Container>
    </ViewWrapper>
  );
});

const STouch = styled.TouchableOpacity<{isSelected?: boolean}>`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
  margin-right: 20px;
`;

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    justifyContent: 'center',
  },
}))`
  background-color: ${Colors.backgroundColor};
  margin-left: 20px;
  padding: 12px 0px;
  flex-direction: row;
`;

export default ScrollTabBarProduct;
