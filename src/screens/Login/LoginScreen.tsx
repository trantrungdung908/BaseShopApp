import React, {memo, useCallback, useMemo, useState} from 'react';
import ScreenWrapper from '@/components/ScreenWrapper';
import {StatusBarViewTransparent} from '@/components/Header/DynamicHeader';
import {styled} from '@/global';
import {IC_EYE, IC_EYE_CLOSE, IC_LOGIN} from '@/assets';
import {scale} from '@/utils/scale';
import {InputBorder} from '@/components/Input/components/InputBorder';
import {ParamLoginInterface} from '@/screens/Login/types';
import {Keyboard, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import {Colors} from '@/themes';
import {RoundedButton} from '@/screens/Login/components/RoundedButton';
import useAutoToastError from '@/hooks/useAutoToastError';
import {useAuthContext} from '@/screens/Login/authContext';
import {navigateToRegisterScreen} from '@/utils/navigation';
import {Bold, Regular} from '@/components/CommonStyled';
import {ViewWrapper} from '@/components';
import {Icon} from '@/components/Views/Icon';

export const LoginScreen = memo(function LoginScreen() {
  const [paramsCustom, setParamsCustom] = useState<ParamLoginInterface>({
    username: 'tranhoang@gmail.com',
    password: '1111',
  });
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const onTextChange = useCallback((keyName: string, value: string) => {
    setParamsCustom(state => ({...state, [keyName]: value}));
  }, []);

  const {onSignIn, error, loading} = useAuthContext();

  const onSubmit = useCallback(() => {
    onSignIn && onSignIn(paramsCustom, true);
  }, [onSignIn, paramsCustom]);

  const onNavigate = useCallback(() => {
    navigateToRegisterScreen();
  }, []);

  const onShowPassword = useCallback(() => {
    setIsShowPassword(!isShowPassword);
  }, [isShowPassword]);

  const passwordHidden = useMemo(() => {
    return (
      <STouchEye onPress={onShowPassword}>
        <Icon source={isShowPassword ? IC_EYE_CLOSE : IC_EYE} size={16} />
      </STouchEye>
    );
  }, [isShowPassword, onShowPassword]);

  useAutoToastError(error);

  return (
    <ScreenWrapper>
      <StatusBarViewTransparent />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <ContainerHeader>
            <HeaderTitle>{'Hãy đăng nhập'}</HeaderTitle>
            <SubHeaderTitle>{'Chào mừng trở lại!'}</SubHeaderTitle>
            <InputBorder
              value={paramsCustom.username}
              keyName={'username'}
              placeHolder={'Tên đăng nhập'}
              onTextChange={onTextChange}
              containerStyle={styles.containerInput}
            />
            <InputBorder
              value={paramsCustom.password}
              keyName={'password'}
              placeHolder={'Mật khẩu'}
              onTextChange={onTextChange}
              secureTextEntry={!isShowPassword}
              rightComponent={passwordHidden}
            />
          </ContainerHeader>
          <SViewWrapper>
            <SRoundedButton onPress={onSubmit} disabled={loading}>
              <Title color={Colors.white}>{'Đăng nhập'}</Title>
              <SIcon source={IC_LOGIN} />
            </SRoundedButton>
            <ContainerSubTitle>
              <SubTitle>{'Nếu chưa có tài khoản,đăng ký'}</SubTitle>
              <STouch onPress={onNavigate}>
                <Title color={Colors.blue}>{' Tại đây'}</Title>
              </STouch>
            </ContainerSubTitle>
          </SViewWrapper>
        </Container>
      </TouchableWithoutFeedback>
    </ScreenWrapper>
  );
});

const SViewWrapper = styled(ViewWrapper)`
  width: 100%;
  align-items: center;
`;

const SIcon = styled.Image`
  width: 24px;
  height: 24px;
  tint-color: ${Colors.white};
  position: absolute;
  right: 0;
  margin-right: 16px;
`;

const ContainerHeader = styled.View`
  align-self: flex-start;
  width: 100%;
`;

const SRoundedButton = styled(RoundedButton)`
  margin-top: ${scale(40)}px;
  background-color: ${Colors.brown};
  flex-direction: row;
`;

const STouch = styled.TouchableOpacity``;

const ContainerSubTitle = styled.View`
  flex-direction: row;
  align-items: flex-end;
  margin-top: 32px;
`;

const Title = styled(Bold)<{color?: string}>`
  font-size: 16px;
  color: ${props => props.color || Colors.gray1};
`;

const SubTitle = styled(Title)``;

const HeaderTitle = styled(Bold)`
  font-size: 24px;
  align-self: flex-start;
  margin-top: 32px;
`;

const SubHeaderTitle = styled(Regular)`
  font-size: 14px;
  color: ${Colors.gray2};
  align-self: flex-start;
  margin-top: 8px;
`;

const Container = styled.View`
  align-items: center;
  flex: 1;
  padding: 12px 16px;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const STouchEye = styled.TouchableOpacity`
  align-self: center;
  padding: 10px;
`;

const styles = StyleSheet.create({
  containerInput: {
    marginTop: 40,
    marginBottom: 32,
  },
});
export default LoginScreen;
