import React, {memo, useCallback} from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {styled} from '@/global';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {Medium, Regular} from '@/components/CommonStyled';
import {Colors} from '@/themes';
import {openModalAddress} from '@/utils/navigation';
import {useAsyncEffect} from '@/hooks/useAsyncEffect';
import {requestGetListCountry} from '@/store/countries/functions';
import {getInfo} from '@/store/user';
import {View} from 'react-native';
import useAutoToastError from '@/hooks/useAutoToastError';

export const AddressScreen = memo(function () {
  const openModal = useCallback((title: string) => {
    return openModalAddress({title: title});
  }, []);

  const userInfo = getInfo();
  const {loading, error, call} = useAsyncEffect(async () => {
    await requestGetListCountry();
  });

  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Danh sách địa chỉ'} />

      <Container>
        <SText>
          Các địa chỉ bên dưới mặc định sẽ được sử dụng ở trang thanh toán
        </SText>
        <ContainerInfo>
          <STitle>Địa chỉ thanh toán</STitle>
          <STouchEdit onPress={() => openModal('billing')}>
            <TitleEdit>{userInfo.billing ? ' Sửa' : 'Thêm'}</TitleEdit>
          </STouchEdit>
        </ContainerInfo>

        <WrapInfo>
          {userInfo.billing ? (
            <View>
              <TextInfo>
                Họ tên: {userInfo.billing.first_name}{' '}
                {userInfo.shipping.last_name}
              </TextInfo>
              <TextInfo>Công ty: {userInfo.billing.company}</TextInfo>
              <TextInfo>Địa chỉ: {userInfo.billing.address_1}</TextInfo>
              <TextInfo>Thành phố: {userInfo.billing.city}</TextInfo>
            </View>
          ) : (
            <TextInfo>Bạn vẫn chưa thêm địa chỉ nào.</TextInfo>
          )}
        </WrapInfo>

        <ContainerInfo>
          <STitle>Địa chỉ giao hàng</STitle>
          <STouchEdit onPress={() => openModal('shipping')}>
            <TitleEdit>{userInfo.shipping ? ' Sửa' : 'Thêm'}</TitleEdit>
          </STouchEdit>
        </ContainerInfo>

        <WrapInfo>
          {userInfo.shipping ? (
            <View>
              <TextInfo>
                Họ tên: {userInfo.shipping.first_name}{' '}
                {userInfo.shipping.last_name}
              </TextInfo>
              <TextInfo>Công ty: {userInfo.shipping.company}</TextInfo>
              <TextInfo>Địa chỉ: {userInfo.shipping.address_1}</TextInfo>
              <TextInfo>Thành phố: {userInfo.shipping.city}</TextInfo>
            </View>
          ) : (
            <TextInfo>Bạn vẫn chưa thêm địa chỉ nào.</TextInfo>
          )}
        </WrapInfo>
      </Container>
    </ScreenWrapper>
  );
});

const Container = styled.View`
  flex: 1;
  margin-bottom: ${getBottomSpace() + 32}px;
  padding: 10px 20px;
  border-top-color: ${Colors.gray7};
  border-top-width: 1px;
`;

const ContainerInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const SText = styled(Regular)`
  font-size: 14px;
  color: ${Colors.gray2};
  margin-bottom: 10px;
`;

const STitle = styled(Medium)`
  font-size: 16px;
  color: ${Colors.gray1};
  text-transform: uppercase;
`;

const STouchEdit = styled.TouchableOpacity`
  margin-right: 16px;
`;

const TitleEdit = styled(Medium)`
  font-size: 15px;
  color: ${Colors.orange1};
`;

const WrapInfo = styled.View`
  margin: 12px 0;
`;

const TextInfo = styled(Regular)`
  font-size: 15px;
  font-style: italic;
  color: ${Colors.gray2};
  padding: 4px 0;
`;
