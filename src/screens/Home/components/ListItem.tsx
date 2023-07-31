import {ViewProps} from 'react-native';
import React, {memo} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes';
import {Medium} from '@/components/CommonStyled';
import {scale} from '@/utils/scale';

interface ListItemInterface extends ViewProps {
  onPress?: () => void;
  item: any;
  index: number;
}

export const ListItem = memo(function ListItem({
  onPress,
  item,
}: ListItemInterface) {
  return (
    <STouchClass onPress={onPress}>
      <WrapperImage color={item.color}>
        <SImage source={item.img} resizeMode="center" />
      </WrapperImage>
      <TitleCom numberOfLines={1}>{item.title}</TitleCom>
    </STouchClass>
  );
});

const STouchClass = styled.TouchableOpacity`
  width: 25%;
  align-items: center;
  margin-bottom: 16px;
`;

const TitleCom = styled(Medium)`
  font-size: 14px;
  line-height: ${scale(17)}px;
  color: ${Colors.gray1};
  margin-top: 8px;
  text-align: center;
`;
const WrapperImage = styled.View<{color?: string}>`
  width: ${scale(56)}px;
  height: ${scale(56)}px;
  justify-content: center;
  align-items: center;
  border: 1px solid ${props => props.color};
  border-radius: 16px;
`;
const SImage = styled.Image`
  justify-content: center;
  width: ${scale(28)}px;
  height: ${scale(28)}px;
`;
