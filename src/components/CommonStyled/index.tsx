import {DefaultTheme} from 'styled-components';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';

export const Regular = styled.Text`
  font-family: 'SVN-Gilroy';
`;

export const Medium = styled.Text`
  font-family: 'SVN-GilroyMedium';
`;

export const Bold = styled.Text`
  font-family: 'SVN-GilroyBold';
`;

export const Italic = styled.Text`
  font-family: 'SVN-GilroyItalic';
`;

export const Title = styled(Medium)`
  font-size: 15px;
  line-height: 18px;
  color: ${Colors.primary};
`;

const generateStyledText = (themeKey: keyof DefaultTheme) => styled(Regular)`
  color: ${Colors[themeKey]};
`;

const generateStyledIcon = (themeKey: keyof DefaultTheme) => styled.Image`
  tint-color: ${Colors[themeKey]};
`;

// @ts-ignore

export const StyledText = {
  Grey1: generateStyledText('grey1'),
  Grey2: generateStyledText('grey2'),
  Grey3: generateStyledText('grey3'),
  Grey4: generateStyledText('grey4'),
  Grey5: generateStyledText('grey5'),
  Grey6: generateStyledText('grey6'),
  Blue: generateStyledText('blue'),
  White: generateStyledText('white'),
  Black: generateStyledText('black'),
  Green: generateStyledText('green'),
  Red: generateStyledText('red'),
  Orange: generateStyledText('orange'),
  Regular,
  Medium,
  Bold,
  Title,
  Italic,
};

export const StyledIcon = {
  Grey1: generateStyledIcon('grey1'),
  Grey2: generateStyledIcon('grey2'),
  Grey3: generateStyledIcon('grey3'),
  Grey4: generateStyledIcon('grey4'),
  Grey5: generateStyledIcon('grey5'),
  Grey6: generateStyledIcon('grey6'),
  Blue: generateStyledIcon('blue'),
  White: generateStyledIcon('white'),
  Black: generateStyledIcon('black'),
  Green: generateStyledIcon('green'),
  Red: generateStyledIcon('red'),
  Orange: generateStyledIcon('orange'),
};
