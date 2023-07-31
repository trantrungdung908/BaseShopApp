import React, {memo} from 'react';
import styled from 'styled-components/native';
import {getStatusBarHeight} from 'react-native-iphone-x-helper';
import {Platform} from 'react-native';
import Icon from '@/components/Icon';

const SWrapper = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${props => props.theme.backgroundColor};
  height: ${Platform.OS === 'ios' ? 44 + getStatusBarHeight(true) : 56}px;
  padding-top: ${Platform.OS === 'ios' ? getStatusBarHeight(true) : 0}px;
  border-bottom-color: rgba(0, 0, 0, 0.1);
  border-bottom-width: 1px;
  padding-horizontal: 16px;
`;

const SCloseButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 100%;
  margin-right: -6px;
`;

const SCloseIcon = styled.Image`
  width: 28px;
  height: 28px;
  tint-color: ${props => props.theme.grey1};
`;

const SBackIcon = styled(Icon)`
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: ${props => props.theme.grey1};
  text-align: center;
  line-height: 40px;
`;

const SText = styled.Text`
  color: ${props => props.theme.grey1};
  font-size: 18px;
`;

interface Props {
  onCloseRequest: () => any;
}
const Header = memo(({onCloseRequest}: Props) => {
  return (
    <SWrapper>
      {/* <SBackIcon name={'arrow_back'} onPress={onCloseRequest}/> */}
      <SText>Những người đã bày tỏ cảm xúc</SText>
      <SCloseButton onPress={onCloseRequest}>
        <SCloseIcon source={require('../../assets/icons/x-mark.png')} />
      </SCloseButton>
    </SWrapper>
  );
});

export default Header;
