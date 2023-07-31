import {styled} from '@/global';
import {BaseOpacityButton} from '@/components/Buttons/BaseButton';
import {fTabletScale} from '@/utils/scale';
import {Colors} from '@/themes';

const RADIUS = fTabletScale(8);

export const RoundedButton = styled(BaseOpacityButton)<{color?: string}>`
  height: ${RADIUS * 6}px;
  border-radius: ${RADIUS}px;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: ${props => props.color || Colors.green1};
`;
