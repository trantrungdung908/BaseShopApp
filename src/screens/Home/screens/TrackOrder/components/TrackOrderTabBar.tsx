import React, {memo, useCallback, useState} from 'react';
import {styled} from '@/global';
import {scale} from '@/utils/scale';
import {Medium} from '@/components/CommonStyled';
import {Colors} from '@/themes';

export enum TYPE_TAB_TRACK_ORDER {
  DANG_XU_LY = 'Đang xử lý',
  CHO_THANH_TOAN = 'Chờ thanh toán',
  HOAN_THANH = 'Hoàn thành',
  HUY = 'Huỷ',
}

interface TrackOrderTabBarInterface {
  onChangeTab?: (value: TYPE_TAB_TRACK_ORDER) => void;
}

export const TrackOrderTabBar = memo(function TrackOrderTabBar({
  onChangeTab,
}: TrackOrderTabBarInterface) {
  const [selected, setSelected] = useState<TYPE_TAB_TRACK_ORDER>(
    TYPE_TAB_TRACK_ORDER.DANG_XU_LY,
  );

  const onChange = useCallback(
    (value: TYPE_TAB_TRACK_ORDER) => {
      onChangeTab && onChangeTab(value);
      setSelected(value);
    },
    [onChangeTab],
  );

  return (
    <Wrapper>
      <Container horizontal showsHorizontalScrollIndicator={false}>
        <STouch
          isSelected={selected === TYPE_TAB_TRACK_ORDER.DANG_XU_LY}
          onPress={() => onChange(TYPE_TAB_TRACK_ORDER.DANG_XU_LY)}>
          <Title>{TYPE_TAB_TRACK_ORDER.DANG_XU_LY}</Title>
        </STouch>
        <STouch
          isSelected={selected === TYPE_TAB_TRACK_ORDER.CHO_THANH_TOAN}
          onPress={() => onChange(TYPE_TAB_TRACK_ORDER.CHO_THANH_TOAN)}>
          <Title>{TYPE_TAB_TRACK_ORDER.CHO_THANH_TOAN}</Title>
        </STouch>
        <STouch
          isSelected={selected === TYPE_TAB_TRACK_ORDER.HOAN_THANH}
          onPress={() => onChange(TYPE_TAB_TRACK_ORDER.HOAN_THANH)}>
          <Title>{TYPE_TAB_TRACK_ORDER.HOAN_THANH}</Title>
        </STouch>
        <STouchEnd
          isSelected={selected === TYPE_TAB_TRACK_ORDER.HUY}
          onPress={() => onChange(TYPE_TAB_TRACK_ORDER.HUY)}>
          <Title>{TYPE_TAB_TRACK_ORDER.HUY}</Title>
        </STouchEnd>
      </Container>
    </Wrapper>
  );
});

const Title = styled(Medium)`
  font-size: 16px;
  margin: 0 6px;
`;

const Wrapper = styled.View`
  height: ${scale(48)}px;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.gray6};
`;

const STouch = styled.TouchableOpacity<{isSelected?: boolean}>`
  align-items: center;
  justify-content: center;
  border-bottom-width: 1px;
  border-bottom-color: ${props =>
    props.isSelected ? Colors.orange1 : 'transparent'};
`;

const STouchEnd = styled(STouch)`
  align-items: center;
  justify-content: center;
`;

const Container = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    justifyContent: 'space-around',
    flex: 1,
  },
}))``;

export default TrackOrderTabBar;
