import React, {memo, ReactElement} from 'react';
import styled from 'styled-components/native';
import {Colors} from '@/themes/Colors';

const Wrapper = styled.View`
  margin-top: 16px;
`;

export const DynamicInputLabel = styled.Text`
  font-size: 14px;
  color: ${Colors.grey2};
`;

export interface DynamicInputProps {
  label: string;
  children?: ReactElement | ReactElement[];
}
export const DynamicInput = memo(function DynamicInput({
  label,
  children,
}: DynamicInputProps) {
  return (
    <Wrapper>
      <DynamicInputLabel>{label}</DynamicInputLabel>
      {children}
    </Wrapper>
  );
});

export default DynamicInput;
