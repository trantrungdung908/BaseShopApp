import React, {memo} from 'react';
import {
  Image,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
} from 'react-native';
import {styled} from '@/global';
import {DynamicInputLabel} from '@/components/Input/DynamicInput';
import {Colors} from '@/themes';

const Wrapper = styled(TouchableOpacity)`
  height: 44px;
  align-items: center;
  justify-content: flex-start;
  flex-direction: row;
`;

const Checkbox = styled.View<{checked?: boolean}>`
  width: 24px;
  height: 24px;
  border-width: 1px;
  border-color: ${p => (p.checked ? Colors.backgroundHeader : Colors.gray5)};
  background-color: ${p =>
    p.checked ? Colors.backgroundHeader : Colors.white};
  border-radius: 24px;
  align-items: center;
  justify-content: center;
`;

const Label = styled(DynamicInputLabel)`
  margin-left: 8px;
`;

export interface DynamicCheckboxProps extends TouchableOpacityProps {
  label?: string;
  value: boolean;
  styleLabel?: TextStyle;
}
export const DynamicCheckbox = memo(function DynamicCheckbox({
  label,
  value,
  styleLabel,
  ...props
}: DynamicCheckboxProps) {
  return (
    <Wrapper {...props}>
      <Checkbox checked={value}>
        {value ? (
          <Image source={require('@/assets/icons/ic_checkbox.png')} />
        ) : null}
      </Checkbox>
      {label ? <Label style={styleLabel}>{label}</Label> : null}
    </Wrapper>
  );
});

export default DynamicCheckbox;
