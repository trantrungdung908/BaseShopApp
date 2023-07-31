import React, {memo} from 'react';
import {TextStyle, TouchableOpacity, View, ViewStyle} from 'react-native';

import {BaseButtonProps} from '@/components/Buttons/BaseButton';
import {styled} from '@/global';
import {Colors} from '@/themes';
import {scale} from '@/utils/scale';

const Title = styled.Text`
  font-size: 16px;
  color: ${Colors.black};
  text-align: center;
  line-height: 24px;
`;

const WrapperTitle = styled.View`
  min-width: ${scale(100)}px;
  padding: 4px ${scale(12)}px;
`;

const SLoadingIndicator = styled.ActivityIndicator`
  margin-right: 16px;
`;
type SubmitButton = BaseButtonProps;

export interface SubmitButtonProps extends SubmitButton {
  title: string;
  withMargin?: boolean;
  loading?: boolean;
  onPress?: () => void;
  wrapperStyles?: ViewStyle;
  titleStyle?: TextStyle;
}
export const SubmitButton = memo(function ({
  title,
  loading = false,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  withMargin = true,
  onPress,
  wrapperStyles,
  titleStyle,
  ...props
}: SubmitButtonProps) {
  return (
    <View>
      <TouchableOpacity onPress={onPress}>
        <View {...props}>
          <WrapperTitle style={wrapperStyles}>
            {loading ? (
              <SLoadingIndicator color={Colors.green1} size={24} />
            ) : (
              <Title style={titleStyle}>{title}</Title>
            )}
          </WrapperTitle>
        </View>
      </TouchableOpacity>
    </View>
  );
});

export default SubmitButton;
