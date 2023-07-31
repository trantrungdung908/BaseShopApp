import React, {memo, useCallback, useState} from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {DynamicHeader} from '@/components/Header/DynamicHeader';
import {styled} from '@/global';
import {scale} from '@/utils/scale';
import {InputBorder} from '@/components/Input/components/InputBorder';
import {ParamRegisterInterface} from '@/screens/Login/types';
import {StyleSheet} from 'react-native';
import {Colors} from '@/themes';
import {RoundedButton} from '@/screens/Login/components/RoundedButton';
import useAutoToastError from '@/hooks/useAutoToastError';
import {useAuthContext} from '@/screens/Login/authContext';

export const RegisterScreen = memo(function RegisterScreen() {
  const [paramsCustom, setParamsCustom] = useState<ParamRegisterInterface>({
    phone: '',
    fullname: '',
    email: '',
    password: '',
  });

  const onTextChange = useCallback((keyName: string, value: string) => {
    setParamsCustom(state => ({...state, [keyName]: value}));
  }, []);

  const {onRegister, error, loading} = useAuthContext();

  const onSubmit = useCallback(() => {
    onRegister && onRegister(paramsCustom);
  }, [onRegister, paramsCustom]);

  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <DynamicHeader title={'Đăng ký'} />
      <Container>
        <InputBorder
          value={paramsCustom.fullname}
          keyName={'fullname'}
          placeHolder={'Họ và tên'}
          onTextChange={onTextChange}
          containerStyle={styles.containerInput}
        />
        <InputBorder
          value={paramsCustom.email}
          keyName={'email'}
          placeHolder={'Nhập email'}
          onTextChange={onTextChange}
          containerStyle={styles.containerInput}
        />
        <InputBorder
          value={paramsCustom.phone}
          keyName={'phone'}
          placeHolder={'Số điện thoại'}
          onTextChange={onTextChange}
          containerStyle={styles.containerInput}
        />
        <InputBorder
          value={paramsCustom.password}
          keyName={'password'}
          placeHolder={'Mật khẩu'}
          onTextChange={onTextChange}
          containerStyle={styles.containerInput}
        />

        <SRoundedButton onPress={onSubmit} disabled={loading}>
          <Title color={Colors.white}>{'Đăng ký'}</Title>
        </SRoundedButton>
      </Container>
    </ScreenWrapper>
  );
});

const SRoundedButton = styled(RoundedButton)`
  margin-top: ${scale(40)}px;
`;

const Title = styled.Text<{color?: string}>`
  font-size: 14px;
  font-weight: 500;
  color: ${props => props.color || Colors.gray1};
`;

const Container = styled.View`
  align-items: center;
  flex: 1;
  padding: 12px 16px;
`;

const styles = StyleSheet.create({
  containerInput: {
    marginVertical: 12,
  },
});
export default RegisterScreen;
