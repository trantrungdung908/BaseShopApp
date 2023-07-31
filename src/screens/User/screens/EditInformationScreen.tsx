import React, {memo, useCallback, useState} from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {styled} from '@/global';
import {getBottomSpace} from 'react-native-iphone-x-helper';
import {InputBorder} from '@/components/Input/components/InputBorder';
import {StyleSheet} from 'react-native';
import {ParamsEditInfo} from '@/screens/User/types';
import SubmitButtonColor from '@/components/Buttons/SubmitButtonColor';
import {scale} from '@/utils/scale';
import {getInfo} from '@/store/user';
import {useAsyncFn} from '@/hooks/useAsyncFn';
import useAutoToastError from '@/hooks/useAutoToastError';
import {requestPostMe} from '@/store/user/functions';
import ToastService from '@/services/ToastService';
import {goBack} from '@/utils/navigation';

export const EditInformationScreen = memo(function () {
  const user = getInfo();

  const [paramsCustom, setParamsCustom] = useState<ParamsEditInfo>({
    first_name: user.first_name,
    last_name: user.last_name,
    name: user.username,
    email: user.email,
  });

  const [{loading, error}, call] = useAsyncFn(async () => {
    await requestPostMe(paramsCustom);
    ToastService.show('Cập nhật thành công!');
    goBack();
  }, [paramsCustom]);

  const onChangeText = useCallback((keyName: string, value: string) => {
    setParamsCustom(state => ({...state, [keyName]: value}));
  }, []);

  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Thông tin tài khoản'} />
      <Container>
        <InputBorder
          value={paramsCustom.first_name}
          keyName={'first_name'}
          placeHolder={'Tên'}
          onTextChange={onChangeText}
          containerStyle={styles.containerInput}
          required={true}
        />
        <InputBorder
          value={paramsCustom.last_name}
          keyName={'last_name'}
          placeHolder={'Họ'}
          onTextChange={onChangeText}
          containerStyle={styles.containerInput}
          required={true}
        />
        <InputBorder
          value={paramsCustom.name}
          keyName={'name'}
          placeHolder={'Tên hiển thị'}
          onTextChange={onChangeText}
          containerStyle={styles.containerInput}
          required={true}
        />
        <InputBorder
          value={paramsCustom.email}
          keyName={'email'}
          placeHolder={'Địa chỉ email'}
          onTextChange={onChangeText}
          containerStyle={styles.containerInput}
          required={true}
        />
      </Container>
      <SRoundedButton
        onPress={call}
        disabled={loading}
        title={'Cập nhật'}
        loading={loading}
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
  margin: 40px 16px;
  margin-bottom: ${getBottomSpace() + 32}px;
`;

const SRoundedButton = styled(SubmitButtonColor)`
  margin-top: ${scale(40)}px;
  padding: 0 16px;
  margin-bottom: 32px;
`;

const styles = StyleSheet.create({
  containerInput: {
    marginTop: 20,
  },
  containerDateTime: {
    width: '100%',
    marginTop: 16,
  },
  submitText: {
    fontSize: 16,
    fontWeight: '500',
  },
});
