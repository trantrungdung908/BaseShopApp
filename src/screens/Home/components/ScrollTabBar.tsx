import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import TabColorLine from './TabColorLine';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';

export enum TYPE_TAB {
  TAT_CA = 'Tất cả',
  BAN_HANG = 'Bán hàng',
  KINH_NGHIEM_MUA_HANG = 'Kinh nghiệm mua hàng',
  TRO_CHUYEN = 'Trò chuyện',
  TRO = 'Trò chuyện',
}

interface ScrollTabBarInterface {
  onChangeTab?: (value: TYPE_TAB) => void;
}

export const ScrollTabBar = memo(function ScrollTabBar({
  onChangeTab,
}: ScrollTabBarInterface) {
  const [selected, setSelected] = useState<TYPE_TAB>(TYPE_TAB.TAT_CA);

  const onChange = useCallback(
    (value: TYPE_TAB) => {
      onChangeTab && onChangeTab(value);
      setSelected(value);
    },
    [onChangeTab],
  );

  return (
    <Container horizontal showsHorizontalScrollIndicator={false}>
      <STouch
        isSelected={selected === TYPE_TAB.TAT_CA}
        onPress={() => onChange(TYPE_TAB.TAT_CA)}>
        <TabColorLine
          isSelected={selected === TYPE_TAB.TAT_CA}
          typeTab={TYPE_TAB.TAT_CA}
        />
      </STouch>
      <STouch
        isSelected={selected === TYPE_TAB.BAN_HANG}
        onPress={() => onChange(TYPE_TAB.BAN_HANG)}>
        <TabColorLine
          isSelected={selected === TYPE_TAB.BAN_HANG}
          typeTab={TYPE_TAB.BAN_HANG}
        />
      </STouch>
      <STouch
        isSelected={selected === TYPE_TAB.KINH_NGHIEM_MUA_HANG}
        onPress={() => onChange(TYPE_TAB.KINH_NGHIEM_MUA_HANG)}>
        <TabColorLine
          isSelected={selected === TYPE_TAB.KINH_NGHIEM_MUA_HANG}
          typeTab={TYPE_TAB.KINH_NGHIEM_MUA_HANG}
        />
      </STouch>
      <STouchEnd
        isSelected={selected === TYPE_TAB.TRO_CHUYEN}
        onPress={() => onChange(TYPE_TAB.TRO_CHUYEN)}>
        <TabColorLine
          isSelected={selected === TYPE_TAB.TRO_CHUYEN}
          typeTab={TYPE_TAB.TRO_CHUYEN}
        />
      </STouchEnd>
    </Container>
  );
});

const STouch = styled.TouchableOpacity<{isSelected?: boolean}>`
  align-items: center;
  margin-left: 15px;
  align-self: center;
  height: 100%;
  padding-top: 10px;
`;

const STouchEnd = styled(STouch)`
  margin-right: 15px;
`;

const Container = styled.ScrollView`
  flex-direction: row;
  background-color: ${Colors.white};
  min-height: ${scale(40)}px;
`;

export default ScrollTabBar;
