import React, {memo, useState} from 'react';
import {Image, Platform, StyleSheet} from 'react-native';
import {styled, translate} from '@/global';
import {LeftIconInput} from '@/components/Input/LeftIconInput';
import useMountedState from 'react-use/lib/useMountedState';
import {useDispatch} from 'react-redux';
import {fScale} from '@/utils/scale';
import {isTablet} from 'react-native-device-info';

const Container = styled.View`
  padding-bottom: 16px;
`;

export const LoginForm = memo(() => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authenCode, setAuthenCode] = useState('');
  const [twoFactor, setTwoFactor] = useState(false);
  const isMounted = useMountedState();
  const [loading, setLoading] = useState(false);

  return (
    <Container>
      <LeftIconInput
        keyboardType={
          Platform.OS === 'android' ? 'email-address' : 'ascii-capable'
        }
        containerStyle={StyleSheet.flatten([
          styles.inputContainer,
          styles.emailInputContainer,
        ])}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        autoCapitalize="none"
        autoCorrect={false}
        inputStyle={styles.inputStyle}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        leftIcon={
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={require('../assets/ic-email.png')}
          />
        }
      />
      <LeftIconInput
        containerStyle={styles.inputContainer}
        textContentType="password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
        placeholder={translate('Password')}
        autoCapitalize="none"
        autoCorrect={false}
        inputStyle={styles.inputStyle}
        leftIconContainerStyle={styles.leftIconContainerStyle}
        leftIcon={
          <Image
            resizeMode="contain"
            style={styles.icon}
            source={require('../assets/ic-key.png')}
          />
        }
      />
      {twoFactor && (
        <LeftIconInput
          keyboardType={
            Platform.OS === 'android' ? 'email-address' : 'ascii-capable'
          }
          containerStyle={styles.inputContainer}
          value={authenCode}
          onChangeText={setAuthenCode}
          placeholder={translate('Authentication code')}
          autoCapitalize="none"
          autoCorrect={false}
          inputStyle={styles.inputStyle}
          leftIconContainerStyle={styles.leftIconContainerStyle}
          leftIcon={
            <Image
              resizeMode="contain"
              style={styles.icon}
              source={require('../assets/ic-authen-code.png')}
            />
          }
        />
      )}
    </Container>
  );
});

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    padding: 0,
    marginTop: isTablet() ? fScale(25) : 16,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: '#828282',
    alignItems: 'center',
  },
  emailInputContainer: {
    marginTop: 0,
  },
  inputStyle: {
    color: '#333333',
  },
  leftIconContainerStyle: {
    marginLeft: 0,
    marginRight: 13,
  },
  icon: {},
});
