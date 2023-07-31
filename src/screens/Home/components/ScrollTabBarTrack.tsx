import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import TabColor from './TabColor';
import {Colors} from '@/themes';

export enum TYPE_TAB_TRACK {
  CHO_XAC_NHAN = 'Chờ xác nhận',
  DA_XAC_NHAN = 'Đã xác nhận',
  DANG_GIAO = 'Đang giao',
  HOAN_THANH = 'Hoàn thành',
  HUY = 'Huỷ',
}

interface ScrollTabBar {
  onChangeTab?: (value: TYPE_TAB_TRACK) => void;
}

export const ScrollTabBar = memo(function ScrollTabBar({
  onChangeTab,
}: ScrollTabBar) {
  const [selected, setSelected] = useState<TYPE_TAB_TRACK>(
    TYPE_TAB_TRACK.CHO_XAC_NHAN,
  );

  const onChange = useCallback(
    (value: TYPE_TAB_TRACK) => {
      onChangeTab && onChangeTab(value);
      setSelected(value);
    },
    [onChangeTab],
  );

  return (
    <Container>
      <STouch
        isSelected={selected === TYPE_TAB_TRACK.CHO_XAC_NHAN}
        onPress={() => onChange(TYPE_TAB_TRACK.CHO_XAC_NHAN)}>
        <TabColor
          isSelected={selected === TYPE_TAB_TRACK.CHO_XAC_NHAN}
          typeTab={TYPE_TAB_TRACK.CHO_XAC_NHAN}
        />
        <ViewBorder>
          <TextNumber>3</TextNumber>
        </ViewBorder>
      </STouch>
      <STouch
        isSelected={selected === TYPE_TAB_TRACK.DA_XAC_NHAN}
        onPress={() => onChange(TYPE_TAB_TRACK.DA_XAC_NHAN)}>
        <TabColor
          isSelected={selected === TYPE_TAB_TRACK.DA_XAC_NHAN}
          typeTab={TYPE_TAB_TRACK.DA_XAC_NHAN}
        />
        <ViewBorder>
          <TextNumber>1</TextNumber>
        </ViewBorder>
      </STouch>
      <STouch
        isSelected={selected === TYPE_TAB_TRACK.DANG_GIAO}
        onPress={() => onChange(TYPE_TAB_TRACK.DANG_GIAO)}>
        <TabColor
          isSelected={selected === TYPE_TAB_TRACK.DANG_GIAO}
          typeTab={TYPE_TAB_TRACK.DANG_GIAO}
        />
      </STouch>
      <STouch
        isSelected={selected === TYPE_TAB_TRACK.HOAN_THANH}
        onPress={() => onChange(TYPE_TAB_TRACK.HOAN_THANH)}>
        <TabColor
          isSelected={selected === TYPE_TAB_TRACK.HOAN_THANH}
          typeTab={TYPE_TAB_TRACK.HOAN_THANH}
        />
      </STouch>
      <STouch
        isSelected={selected === TYPE_TAB_TRACK.HUY}
        onPress={() => onChange(TYPE_TAB_TRACK.HUY)}>
        <TabColor
          isSelected={selected === TYPE_TAB_TRACK.HUY}
          typeTab={TYPE_TAB_TRACK.HUY}
        />
      </STouch>
    </Container>
  );
});

const STouch = styled.TouchableOpacity<{isSelected?: boolean}>`
  flex-direction: row;
  padding: 16px;
`;

const Container = styled.View`
  flex-direction: row;
  align-items: center;
`;
const ViewBorder = styled.View`
  border-radius: 50px;
  position: absolute;
  background-color: ${Colors.orange1};
  padding: 0px 4px;
  right: 6px;
`;
const TextNumber = styled.Text`
  color: ${Colors.white};
  text-align: center;
`;

export default ScrollTabBar;
