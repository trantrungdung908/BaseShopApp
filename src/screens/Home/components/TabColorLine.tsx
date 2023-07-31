import React, {memo} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes';
import {Medium} from '@/components/CommonStyled';
import {View} from 'react-native';
import {BaseStyles} from '@/themes/BaseStyles';
import {scale} from '@/utils/scale';

interface TabColorLine {
  isSelected: boolean;
  typeTab: string;
}

function TabColorLine({isSelected, typeTab}: TabColorLine) {
  return (
    <>
      {isSelected ? (
        <View style={BaseStyles.flex1}>
          <Title isSelected={isSelected}>{typeTab}</Title>
          <Line />
        </View>
      ) : (
        <Title isSelected={isSelected}>{typeTab}</Title>
      )}
    </>
  );
}

const Title = styled(Medium)<{isSelected?: boolean}>`
  font-size: 15px;
  color: ${props => (props.isSelected ? Colors.orange1 : Colors.gray12)};
`;
const Line = styled.View`
  width: ${scale(20)}px;
  height: 2px;
  background-color: ${Colors.orange1};
  align-self: center;
  border-radius: 2px;
  position: absolute;
  bottom: 0px;
`;

export default memo(TabColorLine);
