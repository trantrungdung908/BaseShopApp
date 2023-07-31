import React, {memo} from 'react';
import {styled} from '@/global';
import {Colors} from '@/themes';
import {Medium} from '@/components/CommonStyled';

interface TabColor {
  isSelected: boolean;
  typeTab: string;
}

function TabColor({isSelected, typeTab}: TabColor) {
  return (
    <>
      {isSelected ? (
        <Wrapper>
          <WrapTitle>
            <Title isSelected={isSelected}>{typeTab}</Title>
          </WrapTitle>
        </Wrapper>
      ) : (
        <Title isSelected={isSelected}>{typeTab}</Title>
      )}
    </>
  );
}

const Wrapper = styled.View`
  display: flex;
`;
const WrapTitle = styled.View``;
const Title = styled(Medium)<{isSelected?: boolean}>`
  font-size: 15px;
  color: ${props => (props.isSelected ? Colors.orange1 : Colors.gray12)};
  /* margin-bottom: 9px; */
`;

export default memo(TabColor);
