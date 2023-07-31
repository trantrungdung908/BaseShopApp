import React, {memo, useMemo} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes';
import {TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import _ from 'lodash';
import {Medium} from '@/components/CommonStyled';

const Wrapper = styled(TouchableOpacity)<{
  withMargin: boolean;
  colorButton: string;
}>`
  flex-direction: row;
  align-items: center;
  height: 44px;
  background-color: ${p => (p.disabled ? Colors.gray5 : Colors.green2)};
  justify-content: center;
  border-radius: 8px;
  margin: ${p => (p.withMargin ? '16px 16px 16px' : 0)};
`;

const Title = styled(Medium)<{colorButton: string}>`
  font-size: 18px;
  color: ${props => props.colorButton};
  text-align: center;
`;

const SLoadingIndicator = styled.ActivityIndicator``;

interface SubmitButtonProps {
  title: string;
  color?: string;
  value?: string;
  withMargin?: boolean;
  loading?: boolean;
  textStyle?: TextStyle;
  style?: ViewStyle;
  onPress: (value: string) => void;
  typeBold?: boolean;
  disabled?: boolean;
}
export const SubmitButtonColorWithValue = memo(
  function SubmitButtonColorWithValue({
    title,
    value,
    color,
    loading = false,
    withMargin = true,
    textStyle,
    style,
    onPress,
    disabled,
    typeBold,
  }: SubmitButtonProps) {
    const onPressListener = useMemo(
      () =>
        _.debounce(() => {
          if (loading) {
            return null;
          }
          return onPress(value || '');
        }, 300),
      [onPress, loading, value],
    );

    const colorButton = useMemo(() => {
      let colorDefault;
      if (!typeBold) {
        colorDefault = (color || Colors.blue1) + '20';
      } else {
        colorDefault = color || Colors.blue1;
      }
      return colorDefault;
    }, [typeBold, color]);

    const colorText = useMemo(() => {
      let colorDefault;
      if (!typeBold) {
        colorDefault = (color || Colors.blue1) + '';
      } else {
        colorDefault = Colors.white;
      }
      return colorDefault;
    }, [typeBold, color]);

    return (
      <Wrapper
        onPress={onPressListener}
        colorButton={colorButton}
        disabled={disabled}
        activeOpacity={0.6}
        style={style}
        withMargin={withMargin}>
        {loading ? (
          <SLoadingIndicator color={'#007AFF'} size={24} />
        ) : (
          <Title style={textStyle} colorButton={colorText}>
            {title}
          </Title>
        )}
      </Wrapper>
    );
  },
);

export default SubmitButtonColorWithValue;
