import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import TabColor from '@/screens/Home/components/TabColor';
import {ViewWrapper} from '@/components';
import {Colors} from '@/themes';

export enum TYPE_TAB_PORTFOLIO {
  ALL = 'All',
  ACCESSORIES = 'Accessories',
  DECOR = 'Decor',
  FURNITURE = 'Furniture',
  KITCHEN = 'Kitchen',
  LIGHTING = 'Lighting',
}

interface ScrollTabBarInterface {
  onChangeTab?: (value: TYPE_TAB_PORTFOLIO) => void;
}

export const ScrollTabBar = memo(function ScrollTabBar({
  onChangeTab,
}: ScrollTabBarInterface) {
  const [selected, setSelected] = useState<TYPE_TAB_PORTFOLIO>(
    TYPE_TAB_PORTFOLIO.ALL,
  );

  const onChange = useCallback(
    (value: TYPE_TAB_PORTFOLIO) => {
      onChangeTab && onChangeTab(value);
      setSelected(value);
    },
    [onChangeTab],
  );

  return (
    <ViewWrapper>
      <Container horizontal={true} showsHorizontalScrollIndicator={false}>
        <STouch
          isSelected={selected === TYPE_TAB_PORTFOLIO.ALL}
          onPress={() => onChange(TYPE_TAB_PORTFOLIO.ALL)}>
          <TabColor
            isSelected={selected === TYPE_TAB_PORTFOLIO.ALL}
            typeTab={TYPE_TAB_PORTFOLIO.ALL}
          />
        </STouch>
        <STouch
          isSelected={selected === TYPE_TAB_PORTFOLIO.ACCESSORIES}
          onPress={() => onChange(TYPE_TAB_PORTFOLIO.ACCESSORIES)}>
          <TabColor
            isSelected={selected === TYPE_TAB_PORTFOLIO.ACCESSORIES}
            typeTab={TYPE_TAB_PORTFOLIO.ACCESSORIES}
          />
        </STouch>
        <STouch
          isSelected={selected === TYPE_TAB_PORTFOLIO.DECOR}
          onPress={() => onChange(TYPE_TAB_PORTFOLIO.DECOR)}>
          <TabColor
            isSelected={selected === TYPE_TAB_PORTFOLIO.DECOR}
            typeTab={TYPE_TAB_PORTFOLIO.DECOR}
          />
        </STouch>
        <STouch
          isSelected={selected === TYPE_TAB_PORTFOLIO.FURNITURE}
          onPress={() => onChange(TYPE_TAB_PORTFOLIO.FURNITURE)}>
          <TabColor
            isSelected={selected === TYPE_TAB_PORTFOLIO.FURNITURE}
            typeTab={TYPE_TAB_PORTFOLIO.FURNITURE}
          />
        </STouch>
        <STouch
          isSelected={selected === TYPE_TAB_PORTFOLIO.KITCHEN}
          onPress={() => onChange(TYPE_TAB_PORTFOLIO.KITCHEN)}>
          <TabColor
            isSelected={selected === TYPE_TAB_PORTFOLIO.KITCHEN}
            typeTab={TYPE_TAB_PORTFOLIO.KITCHEN}
          />
        </STouch>
        <STouch
          isSelected={selected === TYPE_TAB_PORTFOLIO.LIGHTING}
          onPress={() => onChange(TYPE_TAB_PORTFOLIO.LIGHTING)}>
          <TabColor
            isSelected={selected === TYPE_TAB_PORTFOLIO.LIGHTING}
            typeTab={TYPE_TAB_PORTFOLIO.LIGHTING}
          />
        </STouch>
      </Container>
    </ViewWrapper>
  );
});

const STouch = styled.TouchableOpacity<{isSelected?: boolean}>`
  flex: 1;
  margin-right: 20px;
`;

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    justifyContent: 'center',
  },
}))`
  background-color: ${Colors.backgroundColor};
  margin-left: 20px;
  padding: 12px 0;
  flex-direction: row;
`;

export default ScrollTabBar;
