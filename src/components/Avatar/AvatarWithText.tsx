import React, {memo, useMemo} from 'react';
import {ViewStyle} from 'react-native';
import styled from 'styled-components/native';
import {Colors} from '@/themes';
import {getAvatarColorText} from '@/utils/constants';

interface AvatarItemProps {
  text: string;
  containerStyle?: ViewStyle;
  iconName: string | undefined;
  type: string | 'circle' | 'square';
  backgroundColor?: string;
  size?: number;
}

const Container = styled.View<{
  backgroundColor: string;
  type: string;
  iconName?: string;
  size?: number;
}>`
  width: ${p => p.size || 24}px;
  height: ${p => p.size || 24}px;
  border-radius: ${props =>
    props.iconName
      ? 0
      : props.type === 'circle'
      ? (props.size && props.size / 2) || 12
      : 4}px;
  background-color: ${Colors.backgroundColor};
  overflow: hidden;
  align-items: center;
  justify-content: center;
  border-width: 0.5px;
  border-color: ${Colors.black};
`;

const Title = styled.Text`
  color: ${Colors.white};
  font-size: ${13}px;
  padding-left: 1px;
`;

const SImage = styled.Image<{size?: number}>`
  width: ${p => p.size || 24}px;
  height: ${p => p.size || 24}px;
`;
export const AvatarWithText = memo(
  ({
    text,
    type,
    iconName,
    containerStyle,
    backgroundColor,
    size,
  }: AvatarItemProps) => {
    const backgroundColorCB = useMemo(() => {
      if (backgroundColor) {
        return backgroundColor;
      }
      return getAvatarColorText(text);
    }, [text, backgroundColor]);

    return (
      <Container
        type={type}
        backgroundColor={iconName ? 'transparent' : backgroundColorCB}
        iconName={iconName}
        size={size}
        style={containerStyle}>
        {iconName ? (
          // @ts-ignore
          <SImage size={size} source={iconName} />
        ) : (
          <Title>{text && text[0].toUpperCase()}</Title>
        )}
      </Container>
    );
  },
);
