import * as React from 'react';
import {memo} from 'react';
import styled from 'styled-components/native';
import {ImageSourcePropType} from 'react-native';
import {Colors} from '@/themes';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {IC_PLUS} from '@/assets';

interface Props {
  onPress: () => void;
  image?: ImageSourcePropType;
}

const DefaultIcon = styled.Image`
  tint-color: ${Colors.blue1};
  width: 18px;
  height: 18px;
`;
const FloatingButton = memo((props: Props) => {
  const {onPress, image} = props;
  return (
    <STouchRoot activeOpacity={1} onPress={onPress}>
      {image ? <SImage source={image} /> : <DefaultIcon source={IC_PLUS} />}
    </STouchRoot>
  );
});

export default FloatingButton;

const STouchRoot = styled.TouchableOpacity`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  background-color: ${Colors.backgroundColor};
  position: absolute;
  bottom: ${20 + getBottomSpace()}px;
  right: 20px;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.25);
  elevation: 5;
`;

const SImage = styled.Image``;
