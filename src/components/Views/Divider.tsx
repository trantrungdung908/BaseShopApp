import styled from 'styled-components/native';
import {Colors} from '@/themes';

export const Divider = styled.View<{height?: number}>`
  width: 100%;
  height: ${p => p.height || 1}px;
  background-color: ${Colors.gray7};
`;
