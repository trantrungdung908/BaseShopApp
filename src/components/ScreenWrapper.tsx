import {styled} from '@/global';
import {Colors} from '@/themes';

export const ScreenWrapper = styled.View`
  flex: 1;
  background-color: ${() => Colors.backgroundColor};
`;

export const ScreenScrollWrapper = styled.ScrollView<{
  backgroundColor?: string;
}>`
  flex: 1;
  background-color: ${props => props?.backgroundColor || Colors.backgroundColor};
`;

export default ScreenWrapper;
