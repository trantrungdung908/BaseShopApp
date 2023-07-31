import React, {memo, PropsWithChildren} from 'react';
import {ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';
import {translate} from '@/global';

const Container = styled.View`
  width: 100%;
`;

const ContentContainer = styled.View`
  width: 100%;
  height: 44px;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 16px;
`;

const SText = styled.Text`
  flex: 1;
  font-size: 16px;
  color: ${Colors.grey2};
  padding-right: 8px;
`;

const Save = styled.Text`
  font-size: 17px;
  color: ${Colors.blue};
`;

const ButtonSave = styled.TouchableOpacity`
  padding: 8px 16px;
  margin-right: -16px;
`;

const SDivider = styled.View`
  width: 100%;
  height: 1px;
  background-color: ${Colors.gray2}1A;
`;

interface OwnProps {
  title: string;
  onClose?: () => void;
  noDivider?: boolean;
  containerStyle?: ViewStyle;
  onSave?: () => void;
}

type Props = OwnProps & PropsWithChildren<any>;

export const BottomMenuHeader = memo(
  ({title, onClose, noDivider, containerStyle, onSave, children}: Props) => {
    return (
      <Container>
        <ContentContainer style={containerStyle}>
          <SText numberOfLines={1} ellipsizeMode="tail">
            {title}
          </SText>
          {onSave && (
            <ButtonSave onPress={onSave}>
              <Save>{translate('common.done')}</Save>
            </ButtonSave>
          )}
          {children}
        </ContentContainer>
        {!noDivider && <SDivider />}
      </Container>
    );
  },
);
