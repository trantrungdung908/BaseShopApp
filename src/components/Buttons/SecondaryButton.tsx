import React, {memo, ReactElement} from 'react';
import {styled} from '@/global';
import {
  BaseButtonOpacityProps,
  BaseOpacityButton,
} from '@/components/Buttons/BaseButton';
import {StyledText} from '@/components/CommonStyled';
// @ts-ignore
import {SvgXml} from 'react-native-svg';
import {CssView} from '@/BaseComponents';
import {TextProps} from 'react-native';
import {Colors} from '@/themes';

const Wrapper = styled(BaseOpacityButton)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  min-height: 44px;
  background-color: ${p => (p.disabled ? Colors.gray1 : Colors.primary)}20;
  margin: 16px;
`;

const Title = styled(StyledText.Medium)`
  font-size: 18px;
  line-height: 21px;
  color: ${Colors.primary};
`;

export interface SecondaryButtonProps extends BaseButtonOpacityProps {
  title: string;
  titleProps?: TextProps;
  disabled?: boolean;
  iconElement?: ReactElement;
}
export const SecondaryButton = memo(function SecondaryButton({
  title,
  titleProps,
  iconElement,
  ...props
}: SecondaryButtonProps) {
  return (
    <Wrapper {...props}>
      {iconElement ? <CssView marginRight={8}>{iconElement}</CssView> : null}
      <Title {...titleProps}>{title}</Title>
    </Wrapper>
  );
});

export default SecondaryButton;

const addSvgStr = (
  color: string,
) => `<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M9 0H7V7H0V9H7V16H9V9H16V7H9V0Z" fill="${color}"/>
</svg>`;

export const SecondaryButtonSample = {
  Add: memo(function SecondaryButtonSample_Add(props: SecondaryButtonProps) {
    return (
      <SecondaryButton
        iconElement={<SvgXml xml={addSvgStr(Colors.primary)} />}
        {...props}
      />
    );
  }),
};
