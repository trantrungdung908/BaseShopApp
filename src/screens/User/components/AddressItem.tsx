import React, {memo} from 'react';
import {styled} from '@/global';
import {Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {Icon} from '@/components/Views/Icon';
import {IC_LOCATION_V2} from '@/assets';

export interface AddressItemInterface {
  name: string;
  phone: string;
  address: string;
}

export const AddressItem = memo(function ({
  name,
  phone,
  address,
}: AddressItemInterface) {
  return (
    <Wrapper>
      <Container>
        <ContainerTitle>
          <TitleName>{name}</TitleName>
          <TitlePhone>{phone}</TitlePhone>
        </ContainerTitle>
        <TitleAddress>{address}</TitleAddress>
      </Container>
      <Icon size={20} source={IC_LOCATION_V2} />
    </Wrapper>
  );
});

const Wrapper = styled.View`
  flex-direction: row;
  padding: 16px;
  border-bottom-width: 1.5px;
  border-color: ${Colors.gray7};
  justify-content: space-between;
`;

const ContainerTitle = styled.View`
  flex-direction: row;
`;

const Container = styled.View``;

const TitleName = styled(Regular)`
  font-size: 16px;
  padding-right: 12px;
  border-right-width: 1px;
`;

const TitlePhone = styled(Regular)`
  font-size: 16px;
`;

const TitleAddress = styled(Regular)`
  font-size: 16px;
  color: ${Colors.gray3};
  margin-top: 6px;
`;
