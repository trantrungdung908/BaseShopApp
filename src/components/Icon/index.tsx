import * as React from 'react';
import {ComponentProps} from 'react';
import styled from 'styled-components/native';
import FontMap_BaseSharp from './fontmap-BaseSharp';
import {Text} from 'react-native';

const SText = styled(Text)``;

type Props = {
  name: keyof typeof FontMap_BaseSharp;
} & ComponentProps<typeof Text>;

const Icon = ({name, ...props}: Props) => {
  return <SText {...props}>{FontMap_BaseSharp[name] || '?'}</SText>;
};

Icon.displayName = 'Icon';

type IconBlockProps = {
  size: 24 | 28 | 32 | 36 | 40 | 44 | 48;
} & ComponentProps<typeof Icon>;

const SIconBlockIcon = styled(Icon)<IconBlockProps>(
  ({size}) => `
    font-size: ${size - 8}px;
    width: ${size}px;
    line-height: ${size}px;
    text-align: center; 
`,
);

export const IconBlock = ({size = 24, ...props}: IconBlockProps) => {
  return <SIconBlockIcon size={size} {...props} />;
};

export default Icon;
