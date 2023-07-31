import React, {memo, useCallback, useState} from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {styled} from '@/global';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {InputBorder} from '@/components/Input/components/InputBorder';
import {StyleSheet} from 'react-native';
import SubmitButtonColor from '@/components/Buttons/SubmitButtonColor';
import {scale} from '@/utils/scale';
import {BottomMenuSelector} from '@/components/BottomMenu';
import {getAllCountries} from '@/store/countries';
import {getInfo} from '@/store/user';
import useAsyncFn from '@/hooks/useAsyncFn';
import {requestChangeAddress} from '@/store/user/functions';
import {goBack} from '@/utils/navigation';
import {useNavigationParams} from '@/hooks/useNavigationParams';
import ToastService from '@/services/ToastService';

interface ParamsAddressModal {
  first_name: string;
  last_name: string;
  company: string;
  state: string;
  address_1: string;
  zip_code: string;
  city: string;
  phone: string;
  email: string;
}

export interface ParamsStatusAddress {
  title: string;
}

export const AddAddressModal = memo(function () {
  const {title} = useNavigationParams<ParamsStatusAddress>();
  const user = getInfo();
  const allCountries = getAllCountries();

  const [paramsCustom, setParamsCustom] = useState<ParamsAddressModal>({
    first_name:
      title === 'shipping'
        ? user.shipping?.first_name || ''
        : user.billing?.first_name || '',
    last_name:
      title === 'shipping'
        ? user.shipping?.last_name || ''
        : user.billing?.last_name || '',
    company:
      title === 'shipping'
        ? user.shipping?.company || ''
        : user.billing?.company || '',
    state:
      title === 'shipping'
        ? user.shipping?.state || ''
        : user.billing?.state || '',
    address_1:
      title === 'shipping'
        ? user.shipping?.address_1 || ''
        : user.billing?.address_1 || '',
    zip_code:
      title === 'shipping'
        ? user.shipping?.postcode || ''
        : user.billing?.postcode || '',
    city:
      title === 'shipping'
        ? user.shipping?.city || ''
        : user.billing?.city || '',
    phone:
      title === 'shipping'
        ? user.shipping?.phone || ''
        : user.billing?.phone || '',
    email: user.billing?.email,
  });

  const [{error: errorUser, loading: loadingUser}, callAddress] =
    useAsyncFn(async () => {
      if (
        paramsCustom.address_1 === '' ||
        paramsCustom.first_name === '' ||
        paramsCustom.last_name === '' ||
        paramsCustom.city === '' ||
        paramsCustom.phone === '' ||
        paramsCustom.email === ''
      ) {
        ToastService.showError('Các trường bắt buộc không được để trống !');
        return;
      }
      const {error, message} = await requestChangeAddress(
        // @ts-ignore
        paramsCustom,
        user.id,
        title,
      );
      ToastService.show('Cập nhật thành công');
      goBack();
    }, [paramsCustom]);

  const onTextChange = useCallback(
    (keyName: string, value: string | number) => {
      setParamsCustom(state => ({...state, [keyName]: value}));
    },
    [],
  );

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Thêm địa chỉ'} />
      <Container showsVerticalScrollIndicator={false}>
        <InputBorder
          value={paramsCustom.first_name}
          keyName={'first_name'}
          placeHolder={'Họ'}
          required={true}
          onTextChange={onTextChange}
          containerStyle={styles.containerInput}
        />
        <InputBorder
          value={paramsCustom.last_name}
          keyName={'last_name'}
          placeHolder={'Tên'}
          required={true}
          onTextChange={onTextChange}
          containerStyle={styles.containerInput}
        />
        <InputBorder
          value={paramsCustom.company}
          keyName={'company'}
          placeHolder={'Tên công ty'}
          onTextChange={onTextChange}
          containerStyle={styles.containerInput}
        />
        <BottomMenuSelector
          placeholder={'Quốc gia/ Khu vực'}
          containerStyle={styles.containerInput}
          inputName={'state'}
          label={'Quốc gia'}
          options={allCountries}
          onSelectOption={onTextChange}
          filtered={true}
          selectedValue={paramsCustom.state}
          isHiddenAnimated={true}
        />
        <InputBorder
          value={paramsCustom.address_1}
          keyName={'address_1'}
          placeHolder={'Địa chỉ cụ thể'}
          required={true}
          onTextChange={onTextChange}
          containerStyle={styles.containerInput}
        />
        <InputBorder
          value={paramsCustom.zip_code}
          keyName={'zip_code'}
          placeHolder={'Mã bưu điện'}
          onTextChange={onTextChange}
          containerStyle={styles.containerInput}
        />
        <InputBorder
          value={paramsCustom.city}
          keyName={'city'}
          placeHolder={'Tỉnh/ Thành phố'}
          required={true}
          onTextChange={onTextChange}
          containerStyle={styles.containerInput}
        />
        <InputBorder
          value={paramsCustom.phone}
          keyName={'phone'}
          placeHolder={'Số điện thoại'}
          required={true}
          onTextChange={onTextChange}
          containerStyle={styles.containerInput}
        />
        {title === 'billing' ? (
          <InputBorder
            value={paramsCustom.email}
            keyName={'email'}
            placeHolder={'Địa chỉ email'}
            required={true}
            onTextChange={onTextChange}
            containerStyle={styles.containerInput}
          />
        ) : (
          ''
        )}
      </Container>

      <SRoundedButton
        onPress={callAddress}
        disabled={false}
        title={'Lưu'}
        textStyle={styles.submitText}
      />
    </ScreenWrapper>
  );
});

const Container = styled.ScrollView.attrs(props => ({
  contentContainerStyle: {
    alignItems: 'center',
  },
}))`
  margin: 0px 16px;
  margin-bottom: ${getBottomSpace() + 32}px;
`;

const SRoundedButton = styled(SubmitButtonColor)`
  margin-top: ${scale(40)}px;
  padding: 0 16px;
  margin-bottom: 32px;
`;

const styles = StyleSheet.create({
  containerInput: {
    marginTop: 16,
  },

  submitText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
