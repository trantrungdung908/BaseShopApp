import React, {memo, useMemo} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes';
import {TextStyle, TouchableOpacity, ViewStyle} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import _ from 'lodash';

const Wrapper = styled(TouchableOpacity)<{
  withMargin: boolean;
  colorButton: string;
}>`
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  height: 44px;
  background-color: ${p => (p.disabled ? p.theme.grey5 : p.colorButton)};
  justify-content: center;
  border-radius: 40px;
  margin: ${p => (p.withMargin ? '16px 16px 16px' : 0)};
`;

const Title = styled.Text<{colorButton: string}>`
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
export const SubmitButtonColor = memo(function SubmitButtonColor({
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
      colorDefault = color || Colors.orange1;
    } else {
      colorDefault = color || Colors.orange1;
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
});

export default SubmitButtonColor;
