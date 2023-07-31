import React, {memo} from 'react';
import DynamicInput, {DynamicInputProps} from '@/components/Input/DynamicInput';
import styled from 'styled-components/native';
import {TextInputProps as _TextInputProps} from 'react-native';
import {Colors} from '@/themes/Colors';

const Input = styled.TextInput`
  font-size: 16px;
  color: ${Colors.grey2};
  line-height: 20px;
  padding: 8px 0;
  border-bottom-width: 1px;
  border-bottom-color: ${Colors.black10};
`;

export interface TextInputProps extends DynamicInputProps {
  textInputProps?: Partial<_TextInputProps>;
  onChangeText?: _TextInputProps['onChangeText'];
  value?: _TextInputProps['value'];
  placeholder?: _TextInputProps['placeholder'];
}
export const TextInput = memo(function TextInput({
  value,
  placeholder,
  onChangeText,
  textInputProps,
  ...props
}: TextInputProps) {
  return (
    <DynamicInput {...props}>
      <Input
        {...{
          placeholderTextColor: Colors.grey3,
          ...textInputProps,
          value,
          placeholder,
          onChangeText,
        }}
      />
    </DynamicInput>
  );
});

export default TextInput;
